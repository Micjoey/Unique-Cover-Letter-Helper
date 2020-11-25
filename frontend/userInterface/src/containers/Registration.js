// import React from 'react';
// import { useForm } from 'react-hook-form';

// export default function App() {
//     const { register, handleSubmit, errors } = useForm();
//     const onSubmit = data => console.log(data);
//     console.log(errors);

//     return (
//         <form onSubmit={handleSubmit(onSubmit)}>
//             <input type="text" placeholder="First name" name="First name" ref={register({ required: true, maxLength: 80 })} />
//             <input type="text" placeholder="Last name" name="Last name" ref={register({ required: true, maxLength: 100 })} />
//             <input type="text" placeholder="Email" name="Email" ref={register({ required: true, pattern: /^\S+@\S+$/i })} />
//             <input type="tel" placeholder="Mobile number" name="Mobile number" ref={register({ required: true, minLength: 6, maxLength: 12 })} />
//             <input type="text" placeholder="passwordOne" name="passwordOne" ref={register({ required: true, max: 24, min: 5 })} />
//             <input type="text" placeholder="passwordTwo" name="passwordTwo" ref={register({ required: true, max: 24, min: 5 })} />
//             <input type="submit" />
//         </form>
//     );
// }