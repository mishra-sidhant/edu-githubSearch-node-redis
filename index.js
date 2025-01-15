const express = require("express")
const { SearchRepos } = require("./controller/SearchRepos.js")
const RedisHandler = require("./common/RedisHandler.js")

const app = express()

app.get("/", (req, res) => {
    res.send(`Access the following API routes: <ul> 
            <li>
                <a href='/search-repos?query=javascript'>Search Repositories</a> 
            </li>
            <li>
                <a href='/search-issues?query=redis'>Search Issues</a> 
            </li>
            <li>
                <a href='/search-users?query=tom'>Search Users</a> 
            </li>
        </ul>`)
})

app.get("/search-repos", async (req, res) => {
    if(!req.query.query || req.query.query.trim() === '')
        res.json({"error": "Please provide the search term!!"}).status(400)

    try{
        const responseToSend = await SearchRepos(req.query.query);
        return res.json(responseToSend)
    }catch(e){
        return res.json({"error": JSON.stringify(e)}).status(400)
    }
})

app.get("/search-issues", async (req, res) => {
    if(!req.query.query || req.query.query.trim() === '')
        res.json({"error": "Please provide the search term!!"}).status(400)

    try{
        const responseToSend = await SearchIssues(req.query.query);
        return res.json(responseToSend)
    }catch(e){
        return res.json({"error": JSON.stringify(e)}).status(400)
    }
})

app.get("/search-users", async (req, res) => {
    
    // Verifying the query parameter is passed in the request and not empty
    if (!req.query.query || req.query.query.trim() === '')
        res.json({ "error": "Please provide the search term!!" }).status(400)
    
    try{
        // Calling the SearchUsers() function to get the data
        const responseToSend = await SearchUsers(req.query.query);
        // Sending the response to the user
        res.json(responseToSend);
    } catch (e) {
        res.json({"error": JSON.stringify(e)}).status(400);
    }
})

app.listen(8000, async () => {
    await RedisHandler.init()
    console.log("The App is listening on port 8000")
})
