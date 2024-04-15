import { faker } from '@faker-js/faker';
import { Note } from '../core/types';
import { Color } from '../core/types';
import { time } from 'console';

export const generateRandomNotes = (length:number):Note[]=>{
    const notes :Note[] =[];
    for(var i=0;i<length;i++){
        const index = Math.floor(Math.random() * 3);
        const note:Note = {
            title: faker.word.words(),
            content: faker.word.words(10),
            color: Color[index],
            date: faker.date.anytime()
        }
        notes.push(note);
    }
    return notes;
}
