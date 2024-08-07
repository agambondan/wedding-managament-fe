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
import {
	ImagePopUp,
	SwalDeletePopUp,
} from '../../components/layout/form/pop-up';
import { Select } from '../../components/layout/form/select';
import { Spinner1 } from '../../components/layout/spinner';
import { MasterService } from '../../lib/http';

const imageTaaruf =
	'data:image/jpeg;base64,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';

export default function Story() {
	const router = useRouter();
	const [inputFields, setInputFields] = useState({
		title: '',
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
	const dummyStory = [
		{
			title: 'First Meet',
			date: '01-01-2017',
			province: 'DKI Jakarta',
			city: 'Jakarta Timur',
			address: 'Cakung Timur Kayu Tinggi',
			place: 'Aeon Mall Jakarta Timur',
			link_location: '',
			story:
				'Love Story With : lorem ipsum bekhum bukhum !lorem ipsum bekhum bukhum !',
			image: imageTaaruf,
		},
		{
			title: 'First Meet',
			date: '01-01-2017',
			province: 'DKI Jakarta',
			city: 'Jakarta Timur',
			address: 'Cakung Timur Kayu Tinggi',
			place: 'Aeon Mall Jakarta Timur',
			link_location: '',
			story:
				'Love Story With : lorem ipsum bekhum bukhum !lorem ipsum bekhum bukhum !',
			image: imageTaaruf,
		},
		{
			title: 'First Meet',
			date: '01-01-2017',
			province: 'DKI Jakarta',
			city: 'Jakarta Timur',
			address: 'Cakung Timur Kayu Tinggi',
			place: 'Aeon Mall Jakarta Timur',
			link_location: '',
			story:
				'Love Story With : lorem ipsum bekhum bukhum !lorem ipsum bekhum bukhum !',
			image: imageTaaruf,
		},
		{
			title: 'First Meet',
			date: '01-01-2017',
			province: 'DKI Jakarta',
			city: 'Jakarta Timur',
			address: 'Cakung Timur Kayu Tinggi',
			place: 'Aeon Mall Jakarta Timur',
			link_location: '',
			story:
				'Love Story With : lorem ipsum bekhum bukhum !lorem ipsum bekhum bukhum !',
			image: imageTaaruf,
		},
	];
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
			<div className='w-full grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4'>
				{dummyStory.map((value, index) => {
					return (
						<div
							key={index}
							className='relative mb-10 m-2 shadow-lg border-gray-800 bg-gray-100'
						>
							<img className='w-full' src={value.image} alt='' />
							<div className='absolute top-0 right-0 mt-2'>
								<button
									className='bg-blue-500 m-1 text-gray-200 p-1 px-2 text-xs font-bold rounded'
									onClick={() => setClick(true)}
								>
									Edit
								</button>
								<button
									className='bg-red-500 m-1 text-gray-200 p-1 px-2 text-xs font-bold rounded'
									onClick={() => SwalDeletePopUp({ url: '', router: router })}
								>
									Delete
								</button>
							</div>
							<div className='desc p-4 text-gray-800'>
								<a
									href='https://www.youtube.com/watch?v=dvqT-E74Qlo'
									target='_new'
									className='title font-bold block cursor-pointer hover:underline'
								>
									{value.title} - {value.date}
								</a>
								<a
									href={value.link_location}
									target='_new'
									className='badge bg-indigo-500 text-blue-100 rounded px-1 text-xs font-bold cursor-pointer'
								>
									{value.place}
								</a>
								<span className='description text-sm block py-2 border-gray-400 mb-2'>
									{value.address}, {value.city}, {value.province}
								</span>
								<span className='description text-sm block py-2 border-gray-400 mb-2'>
									Love Story With : lorem ipsum bekhum bukhum !lorem ipsum bekhum bukhum
									!
								</span>
							</div>
						</div>
					);
				})}
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
