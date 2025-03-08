import {useState} from "react";

const URL = 'http://localhost:3000/v1';


const AddClient = () => {
    const [clientText, setClientText] = useState('');
    const [errorText, setErrorText] = useState('');
    const token = sessionStorage.getItem('token');


    const handleAddClient = async (e) => {
        e.preventDefault();
        const form = e.target;
        const client = {
            firstName: form.firstName.value,
            lastName: form.lastName.value,
            plan: form.plan.value,
            birthday: form.birthday.value,
            email: form.email.value,
            address: form.address.value,
            city: form.city.value,
            postalCode: form.postalCode.value,
        };
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + token,

            },
            body: JSON.stringify(client)
        };
        const response = await fetch(URL + '/clients/add', options);
        if (response.status === 201){
            setErrorText("");
            setClientText('Client Added');
        } else {
            setClientText("");
            setErrorText('Client not added');
        }
    }




    return (
        <div className="w-full text-white montserrat-text mt-10">
            <form onSubmit={handleAddClient} className="flex flex-col">
                <div className="flex flex-row">
                    <div className="flex flex-col w-1/3">
                        <label htmlFor="firstName" className="ml-2">First Name</label>
                        <input name="firstName" placeholder="First Name..." type="text"
                               className="m-2 p-3 rounded text-black"/>
                    </div>
                    <div className="flex flex-col w-1/3">
                        <label htmlFor="lastName" className="ml-2">Last Name</label>
                        <input name="lastName" placeholder="Last Name..." type="text"
                               className="m-2 p-3 rounded text-black"/>
                    </div>
                    <div className="flex flex-col w-1/3">
                        <label htmlFor="birthday" className="ml-2">Birthday</label>
                        <input name="birthday" type="date" className="m-2 p-3 rounded text-black"/>
                    </div>
                </div>
                <div className="flex flex-row">
                    <div className="flex flex-col w-1/3">
                        <label htmlFor="address" className="ml-2">Address</label>
                        <input name="address" placeholder="Address..." type="text"
                               className="m-2 p-3 rounded text-black"/>
                    </div>
                    <div className="flex flex-col w-1/3">
                        <label htmlFor="city" className="ml-2">City</label>
                        <input name="city" placeholder="City..." type="text" className="m-2 p-3 rounded text-black"/>
                    </div>
                    <div className="flex flex-col w-1/3">
                        <label htmlFor="postalCode" className="ml-2">Postal Code</label>
                        <input name="postalCode" placeholder="Postal Code..." type="text"
                               className="m-2 p-3 rounded text-black"/>
                    </div>
                </div>
                <div className="flex flex-row">
                    <div className="flex flex-col w-2/3">
                        <label htmlFor="email" className="ml-2">Email</label>
                        <input name="email" placeholder="Email..." type="email" className="m-2 p-3 rounded text-black"/>
                    </div>
                    <div className="flex flex-col w-1/3">
                        <label htmlFor="plan" className="ml-2">Plan</label>
                        <select name="plan" className="m-2 p-3 rounded text-black">
                            <option value="1">Plan 1</option>
                            <option value="2">Plan 2</option>
                            <option value="3">Plan 3</option>
                        </select>
                    </div>
                </div>
                <button type="submit" className="text-white font-bold bg-orange-500 montserrat-text text-1xl border min-w-48 border-orange-500 p-2 m-2 rounded">Create Client</button>
            </form>
            <div className="flex justify-center mt-5">
                {clientText && <p className="montserrat-text text-green-500 text-1xl">{clientText}</p>}
                {errorText && <p className="montserrat-text text-red-500 text-1xl">{errorText}</p>}
            </div>
        </div>
    )
}

export default AddClient;
