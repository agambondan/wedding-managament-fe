import Link from 'next/link';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { AuthService } from '../../lib/http';

export default function Signup() {
	const [user, setUser] = useState({});
	const [show, setShow] = useState(false);
	const handleChangeUser = (e) => {
		switch (e.target.id) {
			case 'firstName':
				setUser((prevUser) => ({
					...prevUser,
					person: { ...prevUser.person, first_name: e.target.value },
				}));
				return;
			case 'lastName':
				setUser((prevUser) => ({
					...prevUser,
					person: { ...prevUser.person, last_name: e.target.value },
				}));
				return;
			case 'username':
				setUser({ ...user, login: e.target.value });
				return;
			case 'email':
				setUser({ ...user, email: e.target.value });
				return;
			case 'password':
				setUser({ ...user, password: e.target.value });
				return;
		}
	};
	const handleSignup = async (event) => {
		event.preventDefault();
		await Swal.fire({
			title: 'Please Wait',
			allowOutsideClick: false,
			timer: 2000,
		});
		Swal.showLoading();
		const request = {
			method: 'POST',
			url: 'signup',
			data: user,
		};
		const response = await AuthService(request)
			.then((res) => {
				return res;
			})
			.catch((err) => {
				if (err.response) {
					return err.response;
				} else if (err.request) {
					return err.request;
				} else {
					return err.message;
				}
			});
		if (response.status === 200) {
			Swal.hideLoading();
			setTimeout(() => {
				Swal.fire({
					icon: 'success',
					title: `Signup Success`,
					showConfirmButton: false,
					timer: 3000,
					allowOutsideClick: true,
				});
			}, 1000);
		} else {
			Swal.hideLoading();
			await Swal.fire({
				icon: 'error',
				title: 'Failed Signup',
				showConfirmButton: false,
				timer: 3000,
				allowOutsideClick: true,
			});
		}
	};
	return (
		<section className='h-screen'>
			<div className='px-6 h-full text-gray-800'>
				<div className='flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full gap-6'>
					<div className='flex-grow flex-shrink md:flex-shrink-0 xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0'>
						<img
							src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp'
							className='w-full'
							alt='Sample image'
						/>
					</div>
					<div className='xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0'>
						<div className='block p-6 rounded-lg shadow-lg bg-white max-w-md'>
							<form onSubmit={handleSignup}>
								<div className='flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5'>
									<p className='text-center font-semibold mx-1 mb-0'>Sign Up</p>
								</div>
								<div className='grid grid-cols-2 gap-4'>
									<div className='form-group mb-6'>
										<input
											type='text'
											id='firstName'
											name='firstName'
											className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
											placeholder='First name'
											onChange={handleChangeUser}
										/>
									</div>
									<div className='form-group mb-6'>
										<input
											type='text'
											id='lastName'
											name='lastName'
											className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
											placeholder='Last name'
											onChange={handleChangeUser}
										/>
									</div>
								</div>
								<div className='form-group mb-6'>
									<input
										type='text'
										id='username'
										name='username'
										className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
										placeholder='username'
										onChange={handleChangeUser}
									/>
								</div>
								<div className='form-group mb-6'>
									<input
										type='email'
										id='email'
										name='email'
										className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
										placeholder='Email address'
										onChange={handleChangeUser}
									/>
								</div>
								<div className='relative form-group mb-6'>
									<input
										type={show ? 'text' : 'password'}
										id='password'
										name='password'
										className='form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
										placeholder='Password'
										onChange={handleChangeUser}
									/>
									<div className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'>
										<label
											onClick={() => {
												setShow(!show);
											}}
										>
											<svg
												className={`h-6 text-gray-700 ${show ? 'hidden' : 'block'}`}
												fill='none'
												xmlns='http://www.w3.org/2000/svg'
												viewBox='0 0 576 512'
											>
												<path
													fill='currentColor'
													d='M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z'
												></path>
											</svg>
										</label>

										<label
											onClick={() => {
												setShow(!show);
											}}
										>
											<svg
												className={`h-6 text-gray-700 ${show ? 'block' : 'hidden'}`}
												fill='none'
												xmlns='http://www.w3.org/2000/svg'
												viewBox='0 0 640 512'
											>
												<path
													fill='currentColor'
													d='M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z'
												></path>
											</svg>
										</label>
									</div>
								</div>
								<button
									type='submit'
									className=' w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
								>
									Sign up
								</button>
								<div className='text-center lg:text-left'>
									<p className='text-sm font-semibold mt-2 pt-1 mb-0'>
										have an account?
										<Link
											href='/client/login'
											className='text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out'
										>
											<a>&nbsp;Login</a>
										</Link>
									</p>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
