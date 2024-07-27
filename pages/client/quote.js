import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ClientLayout from '../../components/client';
import { InputText, InputTextArea } from '../../components/layout/form/fields';
import { BaseModal } from '../../components/layout/form/modal';
import { SwalDeletePopUp } from '../../components/layout/form/pop-up';
import { Spinner1 } from '../../components/layout/spinner';

export default function Quote() {
	const router = useRouter();
	const [inputFields, setInputFields] = useState({
		name: '',
		quote: '',
	});
	const [isLoading, setIsLoading] = useState(false);
	const [click, setClick] = useState(false);
	const [clickThreeDot, setClickThreeDot] = useState(false);
	useEffect(() => {});
	const data = {
		url: `${process.env.ENDPOINT_MASTER}`, // TODO
		redirects: `/client/quote`,
		module_name: `Quote`,
		title: `Save`,
		content_type: `application/json`,
		method: 'POST',
	};
	if (isLoading) return <Spinner1 />;
	return (
		<>
			{click ? (
				<FormModalStory
					inputFields={inputFields}
					setInputFields={setInputFields}
					data={data}
					title={'Quote'}
					setClick={setClick}
				></FormModalStory>
			) : (
				<></>
			)}
			<button
				type='button'
				onClick={() => setClick(true)}
				className='mb-4 inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out'
			>
				Add Quote
			</button>
			<div className='p-6 my-2 border border-gray-100 rounded-xl bg-gray-50 sm:flex sm:space-x-8 sm:p-8'>
				<div className='flex'>
					<div className='w-12 h-12 bg-purple-300 rounded-full flex justify-center items-center text-center shadow-xl'>
						<i className='fa-solid fa-quote-right'></i>
					</div>
					<div className='sm:hidden block'>
						<div className='fixed right-0 mr-10'>
							<button
								className='shadow-sm'
								onClick={() => {
									setClickThreeDot(!clickThreeDot);
								}}
							>
								<i className='fa-solid fa-ellipsis-v fa-fw' aria-hidden='true'></i>
							</button>
							<div className='fixed right-0 mr-12 bg-white rounded-lg shadow-lg'>
								{clickThreeDot ? (
									<>
										<button
											className='block text-center w-full h-full bg-blue-500 text-gray-200 p-2 rounded-sm'
											onClick={() => setClick(true)}
										>
											Edit
										</button>
										<button
											className='block text-center w-full h-full bg-red-500 text-gray-200 p-2 rounded-sm'
											onClick={() => SwalDeletePopUp({ url: '', router: router })}
										>
											Delete
										</button>
									</>
								) : (
									<></>
								)}
							</div>
						</div>
					</div>
				</div>
				<div className='space-y-4 mt-4 text-center sm:mt-0 sm:text-left'>
					<p className='text-gray-600'>
						{' '}
						<span className='font-serif'>&quot;</span> Lorem ipsum dolor sit amet
						consectetur adipisicing elit. Quaerat repellat perspiciatis excepturi est.
						Non ipsum iusto aliquam consequatur repellat provident, omnis ut, sapiente
						voluptates veritatis cum deleniti repudiandae ad doloribus.{' '}
						<span className='font-serif'>&quot;</span>
					</p>
					<div>
						<h6 className='text-lg font-semibold leading-none'>Jane Doe</h6>
					</div>
				</div>
				<div className='sm:block hidden'>
					<div className='fixed right-0 mr-10'>
						<button
							className='shadow-sm'
							onClick={() => {
								setClickThreeDot(!clickThreeDot);
							}}
						>
							<i className='fa-solid fa-ellipsis-v fa-fw' aria-hidden='true'></i>
						</button>
						<div className='fixed right-0 mr-12 bg-white rounded-lg shadow-lg'>
							{clickThreeDot ? (
								<>
									<button
										className='block text-center w-full h-full bg-blue-500 text-gray-200 p-2 rounded-sm'
										onClick={() => setClick(true)}
									>
										Edit
									</button>
									<button
										className='block text-center w-full h-full bg-red-500 text-gray-200 p-2 rounded-sm'
										onClick={() => SwalDeletePopUp({ url: '', router: router })}
									>
										Delete
									</button>
								</>
							) : (
								<></>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

// <img
// 	className='w-20 h-20 mx-auto rounded-full'
// 	src='https://tailus.io/sources/blocks/grid-cards/preview/images/avatars/third_user.webp'
// 	alt='user avatar'
// 	height='220'
// 	width='220'
// 	loading='lazy'
// />;

Quote.layout = ClientLayout;

function FormModalStory(props) {
	const handleChangeText = (key, event) => {
		props.setInputFields({ ...props.inputFields, [key]: event.target.value });
	};
	useEffect(() => {});
	return (
		<BaseModal title={props.title} setClick={props.setClick}>
			<div className='flex flex-wrap -mx-3'>
				<div className='w-full px-3 md:mb-0'>
					<label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
						Name
					</label>
					<InputText
						key={'name'}
						keyInput={'name'}
						placeholder={'First Meet'}
						inputFields={props.inputFields.name}
						handleChangeText={handleChangeText}
					/>
				</div>
			</div>
			<label className='block uppercase tracking-wide text-gray-700 text-xs font-bold my-2'>
				Quote
			</label>
			<InputTextArea
				key={'quote'}
				keyInput={'quote'}
				inputFields={props.inputFields.quote}
				handleChangeText={handleChangeText}
			/>
		</BaseModal>
	);
}
