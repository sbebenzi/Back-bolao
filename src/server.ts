import Fastify from 'fastify'
import cors from '@fastify/cors'
import {z} from 'zod'
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient({
    log:['query'],
})


async function start() {
    const fastify = Fastify({
    //serve pra monitorar a aplicacao 
       logger:true,
    })

    //  é pra dizer quais aplicacoes vao poder consumir o nosso back
    await fastify.register(cors,{
        origin:true
    })

        

    // rota de contagem de bolao(é o que vai dps de http://localhost/)
    fastify.get('/pools/count' ,async () =>{  
        const qtdpools = await prisma.pool.count()
        return { qtdpools}
    })

    fastify.post('/pools/create',async(request,reply)=>{

        const createPoolBody = z.object({
            title: z.string()
        })
        try{
            const {title} = createPoolBody.parse(request.body)

        return reply.status(201).send({title})
        }catch(error){
            return ("Valor passado como titulo do bolão é invalido!")
        }
        
    })

    
    // o host é pra funcionar no mobile
    await fastify.listen({ port:3333, host:'0.0.0.0'})
}

start()