import { Injectable } from '@nestjs/common';
// import { CreateAiDto } from './dto/create-ai.dto';
// import { ConfigService } from '@nestjs/config'
import { UpdateAiDto } from './dto/update-ai.dto';
import Groq from 'groq-sdk';

@Injectable()
export class AiService {
    private groq: any;
    constructor() {
        this.groq = new Groq({
            // apiKey: this.configService.get('GROQ_API_KEY'),
            apiKey: 'GROQ_API_KEY',
        });
    }

    async create(prompt: string) {
        const chatCompletion = await this.groq.chat.completions.create({
            messages: [
                { role: 'system', content: 'You are a helpful assistant.' },
                { role: 'user', content: `${prompt}` },
            ],

            model: 'llama-3.2-1b-preview',
            // model: 'llama-3.1-70b-versatile',

            temperature: 0.7,
            max_tokens: 256,
            top_p: 1,
            stream: false,
            stop: null,
        });

        return chatCompletion;
    }

    findAll() {
        return `This action returns all ai`;
    }

    findOne(id: number) {
        return `This action returns a #${id} ai`;
    }

    update(id: number, updateAiDto: UpdateAiDto) {
        return `This action updates a #${id} ai`;
    }

    remove(id: number) {
        return `This action removes a #${id} ai`;
    }
}
