import React from 'react';
import { Card } from 'flowbite-react';

function Info({ dados }) {
  return (
    <div className='flex flex-wrap py-4 justify-center'>
        {dados.data.map((person, index) => {
            return (
                <Card 
                    className='w-72 text-center m-1 bg-black text-white border-2 border-blue-600' 
                    key={index}
                    imgSrc={`http://localhost:1337${person.attributes.avatar.data.attributes.formats.thumbnail.url}`}
                >
                    <h3 className='font-bold text-xl'>{person.attributes.name}</h3>
                    <p>Height: {person.attributes.height} m</p>
                    <p>Weight: {person.attributes.weight} kg</p>
                    <p>Hair color: {person.attributes.hair_color}</p>
                    <p>Eye color: {person.attributes.eye_color} <span className={`eye-${person.attributes.eye_color.replace(/, | /g, '-')} color-box text-transparent border border-white`}>-=-</span></p>
                </Card>
            );
        })}
    </div>
  );
}


export default Info;
