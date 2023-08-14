import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ClientLayout from '../../components/client';
import {
	InputDate,
	InputText,
	InputTextArea,
} from '../../components/layout/form/fields';
import { BaseModal } from '../../components/layout/form/modal';
import { ImagePopUp } from '../../components/layout/form/pop-up';
import { Select } from '../../components/layout/form/select';
import { Spinner1 } from '../../components/layout/spinner';
import { MasterService } from '../../lib/http';

export default function Story() {
	const router = useRouter();
	const [inputFields, setInputFields] = useState({
		nama: '',
		address: '',
		date: '',
		description: '',
		images: [],
		province_id: '',
		city_id: '',
	});
	const [isLoading, setIsLoading] = useState(false);
	const [click, setClick] = useState(false);
	const [stateProvince, setStateProvince] = useState([{ id: '', name: '' }]);
	useEffect(() => {
		setIsLoading(true);

		async function fetch() {
			let size = 10;
			let sort = 'sort';
			const request = {
				url: `state-provinces?size=${size}`,
			};
			const res = await MasterService(request)
				.then((res) => {
					return res;
				})
				.catch((err) => {
					return err;
				});
			request.url = `state-provinces?size=${res.data.total}&sort=code,name,${sort}&fields=id,name`;
			const response = await MasterService(request)
				.then((res) => {
					return res;
				})
				.catch((err) => {
					return err;
				});
			if (response.data.items.length !== 0) {
				setStateProvince([]);
			}
			response.data.items.map((item) => {
				setStateProvince((prevState) => [
					...prevState,
					{
						id: item.id,
						name: item.name,
					},
				]);
			});
		}

		fetch().then(() => setIsLoading(false));
	}, [router]);
	const data = {
		url: `${process.env.NEXT_PUBLIC_ENDPOINT_MASTER}`, // TODO
		redirects: `/client/profile`,
		module_name: `Profile`,
		title: `Save`,
		content_type: `application/json`,
		method: 'POST',
	};
	let selectItem = {
		province: stateProvince,
	};
	if (isLoading) return <Spinner1 />;
	return (
		<>
			{click ? (
				<FormModalStory
					inputFields={inputFields}
					setInputFields={setInputFields}
					select={selectItem}
					data={data}
					title={'Story'}
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
				Add Story
			</button>
			<div className='holder w-full grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4'>
				<div className='each mb-10 m-2 shadow-lg border-gray-800 bg-gray-100 relative'>
					<Image
						layout='fill'
						className='w-full'
						src={
							'https://berita.99.co/wp-content/uploads/2021/04/contoh-cv-taaruf.jpg'
						}
						alt=''
					/>
					<div className='desc p-4 text-gray-800'>
						<a
							href='https://www.youtube.com/watch?v=dvqT-E74Qlo'
							target='_new'
							className='title font-bold block cursor-pointer hover:underline'
						>
							Pubg Mobile Custom Room (Unlimited)
						</a>
						<a
							href='https://www.youtube.com/user/sam14319'
							target='_new'
							className='badge bg-indigo-500 text-blue-100 rounded px-1 text-xs font-bold cursor-pointer'
						>
							@dynamo_gaming
						</a>
						<span className='description text-sm block py-2 border-gray-400 mb-2'>
							lorem ipsum bekhum bukhum !lorem ipsum bekhum bukhum !
						</span>
					</div>
				</div>
				<div className='each mb-10 m-2 shadow-lg border-gray-800 bg-gray-100 relative'>
					<Image
						layout='fill'
						className='w-full'
						src={
							'https://berita.99.co/wp-content/uploads/2021/04/contoh-cv-taaruf.jpg'
						}
						alt=''
					/>
					<div className='badge absolute top-0 right-0 bg-red-500 m-1 text-gray-200 p-1 px-2 text-xs font-bold rounded'>
						Live
					</div>
					<div className='desc p-4 text-gray-800'>
						<a
							href='https://www.youtube.com/watch?v=dvqT-E74Qlo'
							target='_new'
							className='title font-bold block cursor-pointer hover:underline'
						>
							Pubg Mobile Custom Room (Unlimited)
						</a>
						<a
							href='https://www.youtube.com/user/sam14319'
							target='_new'
							className='badge bg-indigo-500 text-blue-100 rounded px-1 text-xs font-bold cursor-pointer'
						>
							@dynamo_gaming
						</a>
						<span className='description text-sm block py-2 border-gray-400 mb-2'>
							lorem ipsum bekhum bukhum !lorem ipsum bekhum bukhum !
						</span>
					</div>
				</div>
				<div className='each mb-10 m-2 shadow-lg border-gray-800 bg-gray-100 relative'>
					<Image
						layout='fill'
						className='w-full'
						src={
							'https://berita.99.co/wp-content/uploads/2021/04/contoh-cv-taaruf.jpg'
						}
						alt=''
					/>
					<div className='badge absolute top-0 right-0 bg-red-500 m-1 text-gray-200 p-1 px-2 text-xs font-bold rounded'>
						Live
					</div>
					<div className='desc p-4 text-gray-800'>
						<a
							href='https://www.youtube.com/watch?v=dvqT-E74Qlo'
							target='_new'
							className='title font-bold block cursor-pointer hover:underline'
						>
							Pubg Mobile Custom Room (Unlimited)
						</a>
						<a
							href='https://www.youtube.com/user/sam14319'
							target='_new'
							className='badge bg-indigo-500 text-blue-100 rounded px-1 text-xs font-bold cursor-pointer'
						>
							@dynamo_gaming
						</a>
						<span className='description text-sm block py-2 border-gray-400 mb-2'>
							lorem ipsum bekhum bukhum !lorem ipsum bekhum bukhum !
						</span>
					</div>
				</div>
			</div>
		</>
	);
}

Story.layout = ClientLayout;

function FormModalStory(props) {
	const [city, setCity] = useState([{ id: '', name: '' }]);
	const [file, setFile] = useState(null);
	const [selectedFile, setSelectedFile] = useState(null);
	const handleChangeText = (key, event) => {
		props.setInputFields({ ...props.inputFields, [key]: event.target.value });
	};
	useEffect(() => {
		if (props.inputFields.province_id != null) {
			console.log('KE USE EFFECT BRO');
			async function fetch() {
				let size = 10;
				let sort = 'sort';
				const request = {
					url: `cities?size=${size}`,
				};
				const res = await MasterService(request)
					.then((res) => {
						return res;
					})
					.catch((err) => {
						return err;
					});
				request.url = `cities?filters=["province_id","${props.inputFields.province_id}"]&size=${res.data.total}&sort=code,name,${sort}&fields=id,name`;
				const response1 = await MasterService(request)
					.then((res) => {
						return res;
					})
					.catch((err) => {
						return err;
					});
				if (response1.data.items.length !== 0) {
					setCity([]);
				} else {
					setCity([{ id: '', name: '' }]);
				}
				response1.data.items.map((item) => {
					setCity((prevState) => [
						...prevState,
						{
							id: item.id,
							name: item.name,
						},
					]);
				});
			}

			fetch().then();
		}
	}, [props.inputFields.province_id]);
	useEffect(() => {
		if (file) {
			setSelectedFile(URL.createObjectURL(file));
		}
	}, [file]);
	return (
		<BaseModal title={props.title} setClick={props.setClick}>
			<div className='flex flex-wrap -mx-3'>
				<div className='w-full md:w-1/2 px-3 md:mb-0'>
					<label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
						Title
					</label>
					<InputText
						key={'title'}
						keyInput={'title'}
						placeholder={'First Meet'}
						inputFields={props.inputFields.title}
						handleChangeText={handleChangeText}
					/>
				</div>
				<div className='w-full md:w-1/2 px-3'>
					<label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
						Date
					</label>
					<InputDate
						key={'date_time'}
						keyInput={'date_time'}
						inputFields={props.inputFields.date_time}
						handleChangeText={handleChangeText}
					/>
				</div>
			</div>
			<label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
				Address
			</label>
			<InputTextArea
				key={'address'}
				keyInput={'address'}
				inputFields={props.inputFields.address}
				handleChangeText={handleChangeText}
			/>
			<div className='flex flex-wrap -mx-3 py-2'>
				<div className='w-full md:w-1/2 px-3 md:mb-0'>
					{props.select.province !== undefined ? (
						<Select
							data={props.select.province}
							setInputFields={props.setInputFields}
							inputFields={props.inputFields}
							title={'province'}
						/>
					) : (
						<></>
					)}
				</div>
				<div className='w-full md:w-1/2 px-3'>
					{props.inputFields.province_id !== undefined &&
					props.inputFields.province_id !== null &&
					city[0].id !== '' ? (
						<Select
							data={city}
							setInputFields={props.setInputFields}
							inputFields={props.inputFields}
							title={'city'}
						/>
					) : (
						<></>
					)}
				</div>
			</div>
			<div className='flex flex-wrap -mx-3 py-2'>
				<div className='w-full px-3 md:mb-0'>
					<label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
						Place
					</label>
					<InputText
						key={'place'}
						keyInput={'place'}
						placeholder={'Grand Galaxy Convention Center Hall Bekasi'}
						inputFields={props.inputFields.place}
						handleChangeText={handleChangeText}
					/>
				</div>
			</div>
			<div className='flex flex-wrap -mx-3 py-2'>
				<div className='w-full px-3'>
					<label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
						Link Location
					</label>
					<InputText
						key={'link_location'}
						keyInput={'link_location'}
						placeholder={'https://goo.gl/maps/Wf4amX7MHzC9LQn4A'}
						inputFields={props.inputFields.link_location}
						handleChangeText={handleChangeText}
					/>
				</div>
			</div>
			<label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
				Story
			</label>
			<InputTextArea
				key={'description'}
				keyInput={'description'}
				placeholder={'Your Story'}
				inputFields={props.inputFields.description}
				handleChangeText={handleChangeText}
			/>
			<div className={'mt-4 flex flex-wrap'}>
				<div className={'w-full h-fill xl:w-2/6 xl:pr-1'}>
					<label
						className='w-full flex flex-col items-center px-4 py-6 bg-white rounded-md shadow-md tracking-wide
                            uppercase border border-blue cursor-pointer hover:bg-purple-600 hover:text-white text-purple-600 ease-linear transition-all duration-150'
					>
						<i className='fas fa-cloud-upload-alt fa-3x mt-2' />
						<span className='mt-2 text-base leading-normal'>Select a file</span>
						<input
							accept='image/*'
							type='file'
							className='hidden'
							onChange={(event) => {
								setFile(event.target.files[0]);
							}}
						/>
					</label>
					{selectedFile !== null ? (
						<>
							<button
								onClick={(event) => {
									event.preventDefault();
									setFile(null);
									setSelectedFile(null);
								}}
								className={
									'mt-2 text-center w-full bg-red-500 rounded-md text-white py-3 font-medium'
								}
							>
								Delete File
							</button>
						</>
					) : (
						<></>
					)}
				</div>
				<div className={'w-full xl:w-4/6 xl:pl-1'}>
					{selectedFile !== null ? (
						<>
							<p className={'pl-2.5 uppercase text-sm font-semibold'}>Preview</p>
							<button type={'button'} className='relative mt-2 xl:mt-0 xl:ml-2'>
								<Image
									width={360}
									height={360}
									src={selectedFile}
									className={'w-full h-min-screen'}
									onClick={() => {
										ImagePopUp('', selectedFile);
									}}
									alt={'image'}
								/>
							</button>
						</>
					) : (
						<></>
					)}
				</div>
			</div>
		</BaseModal>
	);
}
