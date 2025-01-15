const redis = require("redis")

//Singleton design pattern used to reuse the same Redis client instance object
class RedisHandler{
    #redisClient
    constructor(){
        if(RedisHandler.singleInstance)
            return RedisHandler.singleInstance
        else
            RedisHandler.singleInstance = this
    }

    init = async () => {
        if(this.#redisClient) return

        this.#redisClient = redis.createClient()
        this.#redisClient.connect()
    }

    getRedisClient(){
        if(this.#redisClient) return this.#redisClient

        this.#redisClient = redis.createClient()
        this.#redisClient.connect()
        return this.#redisClient
    }

}

const RedisHandlerInstance = new RedisHandler()

export default RedisHandlerInstance