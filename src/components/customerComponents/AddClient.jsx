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
            <form onSubmit={handleAddClient} className="flex flex-col space-y-4">
                <div className="flex flex-row gap-4">
                    <div className="flex flex-col w-1/3">
                        <label htmlFor="firstName" className="text-gray-300 mb-1 ml-1">First Name</label>
                        <input
                            name="firstName"
                            placeholder="First Name..."
                            type="text"
                            className="p-3 rounded-lg bg-gray-800/60 border border-orange-500/30 text-gray-100 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500/50 transition-colors"
                        />
                    </div>
                    <div className="flex flex-col w-1/3">
                        <label htmlFor="lastName" className="text-gray-300 mb-1 ml-1">Last Name</label>
                        <input
                            name="lastName"
                            placeholder="Last Name..."
                            type="text"
                            className="p-3 rounded-lg bg-gray-800/60 border border-orange-500/30 text-gray-100 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500/50 transition-colors"
                        />
                    </div>
                    <div className="flex flex-col w-1/3">
                        <label htmlFor="birthday" className="text-gray-300 mb-1 ml-1">Birthday</label>
                        <input
                            name="birthday"
                            type="date"
                            className="p-3 rounded-lg bg-gray-800/60 border border-orange-500/30 text-gray-100 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500/50 transition-colors"
                        />
                    </div>
                </div>

                <div className="flex flex-row gap-4">
                    <div className="flex flex-col w-1/3">
                        <label htmlFor="address" className="text-gray-300 mb-1 ml-1">Address</label>
                        <input
                            name="address"
                            placeholder="Address..."
                            type="text"
                            className="p-3 rounded-lg bg-gray-800/60 border border-orange-500/30 text-gray-100 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500/50 transition-colors"
                        />
                    </div>
                    <div className="flex flex-col w-1/3">
                        <label htmlFor="city" className="text-gray-300 mb-1 ml-1">City</label>
                        <input
                            name="city"
                            placeholder="City..."
                            type="text"
                            className="p-3 rounded-lg bg-gray-800/60 border border-orange-500/30 text-gray-100 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500/50 transition-colors"
                        />
                    </div>
                    <div className="flex flex-col w-1/3">
                        <label htmlFor="postalCode" className="text-gray-300 mb-1 ml-1">Postal Code</label>
                        <input
                            name="postalCode"
                            placeholder="Postal Code..."
                            type="text"
                            className="p-3 rounded-lg bg-gray-800/60 border border-orange-500/30 text-gray-100 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500/50 transition-colors"
                        />
                    </div>
                </div>

                <div className="flex flex-row gap-4">
                    <div className="flex flex-col w-2/3">
                        <label htmlFor="email" className="text-gray-300 mb-1 ml-1">Email</label>
                        <input
                            name="email"
                            placeholder="Email..."
                            type="email"
                            className="p-3 rounded-lg bg-gray-800/60 border border-orange-500/30 text-gray-100 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500/50 transition-colors"
                        />
                    </div>
                    <div className="flex flex-col w-1/3">
                        <label htmlFor="plan" className="text-gray-300 mb-1 ml-1">Plan</label>
                        <select
                            name="plan"
                            className="p-3 rounded-lg bg-gray-800/60 border border-orange-500/30 text-gray-100 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500/50 transition-colors appearance-none"
                        >
                            <option value="1">Plan 1</option>
                            <option value="2">Plan 2</option>
                            <option value="3">Plan 3</option>
                        </select>
                    </div>
                </div>
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-orange-600 to-orange-500 text-white font-bold bruno-ace-sc-regular text-lg px-6 py-3 mt-4 rounded-lg shadow-lg hover:from-orange-500 hover:to-orange-400 transition-all duration-300 transform hover:scale-105"
                    >
                        Create Client
                    </button>
                </div>
            </form>

            <div className="flex justify-center mt-5">
                {clientText &&
                    <p className="montserrat-text text-green-400 text-lg bg-green-500/10 px-4 py-2 rounded-full">{clientText}</p>}
                {errorText &&
                    <p className="montserrat-text text-red-400 text-lg bg-red-500/10 px-4 py-2 rounded-full">{errorText}</p>}
            </div>
        </div>
    )
}

export default AddClient;
