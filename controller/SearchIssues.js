import axios from 'axios'
import Constants from '../common/Constants.js'
import { processHrTimeToSeconds } from '../common/Utils.js'
import RedisHandler from '../common/RedisHandler.js'

const SearchIssues = async (searchQuery) => {

    const redisClient = RedisHandler.getRedisClient()

    const startTime = process.hrTime()

    const data = await redisClient.get(searchQuery + "_issues")
    if (data)
        return {
            total_count: data,
            seconds: processHrTimeToSeconds(process.hrTime(startTime)),
            source: "Redis",
        }

    else{
        const response = await axios.get(Constants.GITHUB_SEARCH_ISSUES_URL + searchQuery)
        await redisClient.set(searchQuery + "_issues", response.data.total_count, {'EX': 30})

        return{
            total_count: response.data.total_count,
            seconds: processHrTimeToSeconds(process.hrTime(startTime)),
            source: "GitHub API"
        }
    }
}

export default SearchIssues