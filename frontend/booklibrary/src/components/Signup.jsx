import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { useLocation, useNavigate } from "react-router-dom";

const roles = [
  { id: 1, title: "Customer" },
  { id: 2, title: "Admin" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Signup() {
  const [selectedRole, setselectedRole] = useState(
    roles[0]
  );
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName:'',
    password: '',
    emailId:'',
    role:selectedRole.title.toLowerCase(),
    // ... other form fields
  });


  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:8080/customer/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Ensure the response is in the expected JSON format
      const data = await response.json();

      // Check if registration was successful
      if (data.success) {
        // Redirect to the login page after successful registration
        navigate('/login');
      } else {
        // Handle unsuccessful registration (display error, etc.)
        console.error('Registration failed:', data.message);
      }
    } catch (error) {
      console.error('Error during registration:', error.message);
    }
  }
  console.log(formData)
  
  return (
    <div className="bg-gray-50">
      <div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-16 w-auto"
            src="https://static.wixstatic.com/media/74d41ec4d3c8457c81bcecfafa12315b.png/v1/fill/w_560,h_560,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/74d41ec4d3c8457c81bcecfafa12315b.png"
            alt="Your Company"
          />
          <h2 className="mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register yourself
          </h2>
        </div>
        <form className="mt-4 space-y-6 w-full max-w-md bg-white p-6 border-solid border-gray-700 outline outline-gray-300 rounded-md">
          <div>
            <div className=" border-gray-200 pt-10">
              <h2 className="text-lg font-medium text-gray-900">
                Personal information
              </h2>

              <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      onChange={(e) => handleInputChange(e)}
                      autoComplete="given-name"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      onChange={(e) => handleInputChange(e)}
                      autoComplete="family-name"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="emailId"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      name="emailId"
                      id="emailId"
                      onChange={(e) => handleInputChange(e)}
                      required
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      onChange={(e) => handleInputChange(e)}
                      autoComplete="password"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 border-t border-gray-200 pt-10">
              <RadioGroup
                value={selectedRole}
                onChange={setselectedRole}
              >
                <RadioGroup.Label className="text-lg font-medium text-gray-900">
                  Choose a role
                </RadioGroup.Label>

                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  {roles.map((role) => (
                    <RadioGroup.Option
                      key={role.id}
                      value={role}
                      className={({ checked, active }) =>
                        classNames(
                          checked ? "border-transparent" : "border-gray-300",
                          active ? "ring-2 ring-indigo-500" : "",
                          "relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none"
                        )
                      }
                    >
                      {({ checked, active }) => (
                        <>
                          <span className="flex flex-1">
                            <span className="flex flex-col">
                              <RadioGroup.Label
                                as="span"
                                className="block text-sm font-medium text-gray-900"
                              >
                                {role.title}
                              </RadioGroup.Label>
                            </span>
                          </span>
                          {checked ? (
                            <CheckCircleIcon
                              className="h-5 w-5 text-indigo-600"
                              aria-hidden="true"
                            />
                          ) : null}
                          <span
                            className={classNames(
                              active ? "border" : "border-2",
                              checked
                                ? "border-indigo-500"
                                : "border-transparent",
                              "pointer-events-none absolute -inset-px rounded-lg"
                            )}
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>

              <div className="border-t mt-10 border-gray-200 px-4 py-6 sm:px-6">
                <button
                  onClick={handleRegister}
                  type="submit"
                  className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Sign up
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
