import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient()// conexao com banco

async function main(){
    const user = await prisma.user.create({
        data:{
            name:'maria antonieta',
            email:'mariaAntonieta@gmail.com',
            avatarUrl:'https://static.wikia.nocookie.net/naruto/images/3/33/Naruto_Uzumaki_%28Parte_I_-_HD%29.png/revision/latest?cb=20160316113315&path-prefix=pt-br'
            
        }
    })

    const pool = await prisma.pool.create({
        data:{
            title: 'exemple pool',
            code:'boll0',
            ownerId:   user.id,

            Participant:{
                create:{
                  userId : user.id  
                }
            }
        }
    })

    await prisma.game.create({
        data: {
            date:'2012-11-02T21:27:50.201Z',
            firstTeamCountryCode:'DE',
            secondTeamCountryCode:'BR',
        }
    })

    await prisma.game.create({
        data:{
            date: '2012-11-02T12:27:50.201Z',
            firstTeamCountryCode:'BR',
            secondTeamCountryCode:'AG',

            guesses:{
                create:{
                    firstteamPoints:2,
                    secondTeanPoints:0,

                    participant:{
                        connect:{
                            userId_poolId:{
                                userId:user.id,
                                poolId:pool.id
                            }
                        }
                    }
                }
            }
        }
    })
}

main()