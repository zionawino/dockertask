// ./src/chat/chat.service.ts

import { Injectable } from '@nestjs/common';
import * as Pusher from 'pusher';  // Import Pusher
import Sentiment from 'sentiment';  // Correct import for Sentiment

@Injectable()
export class ChatService {
    
    addMessage(data: { user: string; message: string }) {
        const sentiment = new Sentiment();  // Create an instance of Sentiment
        const sentimentScore = sentiment.analyze(data.message).score;  // Analyze the sentiment score

        const chat = {
            user: data.user,
            message: data.message,
            sentiment: sentimentScore
        };

        // Correctly instantiate Pusher
        const pusher = new Pusher.default({
            appId: '1963982',           
            key: 'ab4e4deca7b0f598ba3b',           
            secret: 'f22af6ddd05ff47aaa1b',     
            cluster: 'eu',       
            useTLS: true                   
        });

        // Trigger an event on the 'chats' channel with 'new-chat' event
        pusher.trigger('chats', 'new-chat', chat);
    }
}
