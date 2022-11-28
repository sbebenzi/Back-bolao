import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient()// conexao com banco

async function main(){
    const user = prisma.user.create({
        data:{
            name:'maria antonieta',
            email:'mariaAntonieta@gmail.com',
            avatarUrl:'https://static.wikia.nocookie.net/naruto/images/3/33/Naruto_Uzumaki_%28Parte_I_-_HD%29.png/revision/latest?cb=20160316113315&path-prefix=pt-br'
            
        }
    })
}

main()