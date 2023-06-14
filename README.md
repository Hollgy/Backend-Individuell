
# Chappy-Chan-API

## Description
This is an API for a school assignment. The task was to create an API to handle a simpler Chatapp
Listed below are Dependencies, Usage DOCS and examples that hopefully will guide any user.


## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Examples](#examples)
- [Contributing](#Contributing)
- [License](#License)
- [Contact_Information](#Contact_Information)





<br>


## Installation
<a name="installation"></a>
Dependencies:

    
        "cors": "^2.8.5",
        "dotenv": "^16.1.4",
        "express": "^4.18.2",
        "jsonwebtoken": "^9.0.0",
        "lowdb": "^6.0.1",
        "react": "^18.2.0",
        "recoil": "^0.7.7",

<br>

## Usage
<a name="usage"></a>
the API is basic and it's primary use is for handling data for a chatapp, it handles channels, messages, login and users in the database. 




<br>
<br>



## API Documentation
<a name="api-documentation"></a>

## Channels
### 1.[GET]  /api/channels 
> Get all channels
### 2.[GET]  /api/channels/channelId
> Get individual channels 
### 3.[POST]  /api/channels/ 
> Request body 	{	name :} .
### 4.[DELETE] /api/channels/”ChannelID” 
> Remove a channel by calling the assigned ID.
### 5.[PUT] api/channels/”channelId”  
> Modify an existing channel, Request Body { name } // does however wipe the chat history.


## Users
### 1.[GET] /api/users  
> Get all users.
### 2.[GET] /api/users  
> Get individual user
### 3.[POST] /api/users/  
> Request body { name, password } 
### 4.[DELETE]  /Api/users/”userID” 
> Remove a user by calling the assigned ID. 
### 5.[PUT] api/users/”userID” 
> Modify an existing user. Request body { name, password }


## Messages
### 1.[GET] /api/channelMessages  
> Get all messages from all channels.
### 2.[GET] /api/channelMessages/channelId  
> Get messages in specified channel
### 3.[POST] /api/channelMessages/channdelId  
> Request body { author, content } 
### 4.[DELETE]  /Api/channelMessages/channelId/messageId
> Remove a message by calling the channel by id and then the desired message by id. 
### 5.[PUT] api/channelMessages/channelId/messageId
> Modify an existing message. Request body { name, password }


## Login
### 1.[POST] /api/login
> Request body { username, password } 






<br>
<br>


## Examples
<a name="examples"></a>
[GET] all Channels 

    const getChannels = async () => {
    try {
        const response = await fetch('/api/channels');
        const data = await response.json();
        return data
    } catch (error) {
        console.log('Error in fetching channels');
    }
    }

 <br>
   
[POST] a new channel

    // ENDPOINT POST channel
    const addChannel = async () => {
    setErrorMessage('');
    try {
        const response = await fetch(`/api/channels/`, {
            method: 'POST',
            body: JSON.stringify({
                name: channelName,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            // Channel successfully added
            // Perform any necessary actions after adding the channel
            getChannels();
        } else if (response.status === 400) {
            // Invalid request
            const errorText = await response.text();
            setErrorMessage(errorText);
        } else if (response.status === 404) {
            // Channel not found
            const errorText = await response.text();
            setErrorMessage(errorText);
        } else {
            // Other error occurred
            throw new Error('An error occurred while adding the channel');
        }
    } catch (error) {
        // Handle network or fetch error
        setErrorMessage(error.message);
        console.log('Error in adding channel');
        
<br>

[PUT]  Edit a message
        
    const updateMessage = async (channelId, messageId, content, setErrorMessage) => {
        setErrorMessage('');
        try {
            const response = await fetch(`/api/channelMessages/${channelId}/${messageId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setErrorMessage(errorData.error);
                console.error('Error:', errorData.error);
            }
        } catch (error) {
            setErrorMessage(`Error when updating message: ${error.message}`);
            console.error('An error occurred:', error);
        }
    };




<br>
<br>

## Contributing
Please Submit any issues found regarding the API, I'd be happy to improve any faults for future projects.


<br>

## License
<br>

¯\\_(ツ)_/¯ 

<br>


## Contact_Information

<br>
https://github.com/Hollgy



