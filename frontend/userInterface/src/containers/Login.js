// import React from "react";
// import { propTypes } from "react-bootstrap/esm/Image";
// import { useForm } from "react-hook-form";
// import * as actions from '../store/actions/Auth'

// export default function Login({ login }) {
//     const { register, handleSubmit, errors, reset } = useForm();
//     const onSubmit = async data => {
//         await actions.authLogin(data.email, data.password);
//         reset();
//     };

//     return (
//         <form onSubmit={handleSubmit(onSubmit)}>
//             <label htmlFor="email">email</label>
//             <input
//                 id="email"
//                 name="email"
//                 ref={register({
//                     required: "required",
//                     pattern: {
//                         value: /S+@S+.S+/,
//                         message: "Entered value does not match email format"
//                     }
//                 })}
//                 type="email"
//             />
//             {errors.email && <span role="alert">{errors.email.message}</span>}
//             <label htmlFor="password">password</label>
//             <input
//                 id="password"
//                 name="password"
//                 ref={register({
//                     required: "required",
//                     minLength: {
//                         value: 5,
//                         message: "min length is 5"
//                     }
//                 })}
//                 type="password"
//             />
//             {errors.password && <span role="alert">{errors.password.message}</span>}
//             <button type="submit">SUBMIT</button>
//         </form>
//     );
// }
