import Fastify from 'fastify'
import cors from '@fastify/cors'
import {z} from 'zod'
import {PrismaClient} from '@prisma/client'
import ShortUniqueId from 'short-unique-id'
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
    fastify.get('/count/pools' ,async () =>{  
        const qtdpools = await prisma.pool.count()
        return {qtdpools}
    })

    //rota de criacao de um novo bolao
    fastify.post('/pools/create',async(request,reply)=>{

        const createPoolBody = z.object({
            title: z.string()
        })
        try{
            const {title} = createPoolBody.parse(request.body)

            const generate = new ShortUniqueId({length: 6})
            const code = String(generate()).toUpperCase()
        
        await prisma.pool.create({
            data:{
                title,
                code
            }
        })

        return reply.status(201).send({title,code})

        }catch(error){
            return reply.status(400).send("Valor passado como titulo do bolão é invalido!")
        }
        
    })

    //rota de contagem de usuarios 
    fastify.get('/count/users' ,async () =>{  
        const qtdUsers = await prisma.user.count()
        return { qtdUsers}
    })

    // rota de contagem de palpites
    fastify.get('/count/guesses' ,async () =>{  
        const qtdGuess = await prisma.guess.count()
        return { qtdGuess}
    })

    // o host é pra funcionar no mobile
    await fastify.listen({ port:3333, host:'0.0.0.0'})
}

start()