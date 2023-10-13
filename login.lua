-- wrk.method = "POST"
-- wrk.headers["Content-Type"] = "application/json"
-- wrk.body = {"email": "user1@example.com", "password": "password1"}
-- wrk.path = "/user/login"

function setup(thread)
    print("setup for thread")
    
end

function delay()
    local delay = 0

    -- print("wait "..delay.."ms")

    return delay
end

local passwords = {
    "password1",
    "Ethereal whispers in a hidden forest",
    "Enchanted river of shimmering dreams",
    "A journey through the labyrinth of time",
    "Mystical conversations with ancient trees",
    "A dance of fireflies on a midsummer night",
    "The melody of raindrops on an old tin roof",
    "Lost in the pages of a forgotten book",
    "Uncharted paths in a world of wonder",
    "Infinite possibilities in a single moment"
}

function request()
    local randomIndex = math.random(1, #passwords)
    local randompassword = passwords[randomIndex]
    local body = '{"email": "user1@example.com", "password":"'..randompassword..'"}'

    local f = wrk.format(
        "POST", 
        "/user/login",
        { ["Content-Type"] = "application/json" },
        body)
    
    return f
end

function response(status, headers, body)
    print(status)
end

-- function sendRequestsInSequence()
--     -- Send the first request
--     local response1 = wrk.format(nil, "/first-request")
--     local res1 = wrk.http.request(response1)

--     -- Extract information from the response if needed

--     -- Send the second request with data from the first response
--     local response2 = wrk.format(nil, "/second-request")
--     local res2 = wrk.http.request(response2)

--     -- Continue with more requests as needed

--     -- Return the result of the final request
--     return res2
-- end

-- sendRequestsInSequence()