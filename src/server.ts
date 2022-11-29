import Fastify from 'fastify'
import cors from '@fastify/cors'
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

    fastify.post('/pool/create',async()=>{
    })

    
    // o host é pra funcionar no mobile
    await fastify.listen({ port:3333, host:'0.0.0.0'})
}

start()