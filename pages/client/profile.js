import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ClientLayout from '../../components/client';
import { CardUserProfile } from '../../components/layout/card';
import { InputText, InputTextArea } from '../../components/layout/form/fields';
import { BaseModal } from '../../components/layout/form/modal';
import { ImagePopUp } from '../../components/layout/form/pop-up';
import { Select } from '../../components/layout/form/select';
import { Spinner1 } from '../../components/layout/spinner';
import { MasterService } from '../../lib/http';

export default function Profile() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [stateProvince, setStateProvince] = useState([{ id: '', name: '' }]);
	const [gender, setGender] = useState([{ id: '', name: '' }]);
	const [click, setClick] = useState(false);
	const [click1, setClick1] = useState(false);
	const [inputMan, setInputMan] = useState({
		first_name: '',
		last_name: '',
		parents_name: '',
		nickname: '',
		address: '',
	});
	const [inputWoman, setInputWoman] = useState({
		first_name: '',
		last_name: '',
		parents_name: '',
		nickname: '',
		address: '',
	});
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
			request.url = `genders?size=${size}`;
			const res2 = await MasterService(request)
				.then((res) => {
					return res;
				})
				.catch((err) => {
					return err;
				});
			request.url = `genders?size=${res2.data.total}&sort=code,name,${sort}&fields=id,name`;
			const response2 = await MasterService(request)
				.then((res) => {
					return res;
				})
				.catch((err) => {
					return err;
				});
			if (response2.data.items.length !== 0) {
				setGender([]);
			}
			response2.data.items.map((item) => {
				setGender((prevState) => [
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
		url: `${process.env.ENDPOINT_MASTER}`, // TODO
		redirects: `/client/profile`,
		module_name: `Profile`,
		title: `Save`,
		content_type: `application/json`,
		method: 'POST',
	};
	let selectItem = {
		gender: gender,
		province: stateProvince,
	};
	if (isLoading) return <Spinner1 />;
	return (
		<>
			{click ? (
				<FormModalProfile
					inputFields={inputMan}
					setInputFields={setInputMan}
					select={selectItem}
					data={data}
					title={'Groom'}
					setClick={setClick}
				></FormModalProfile>
			) : (
				<></>
			)}
			{click1 ? (
				<FormModalProfile
					inputFields={inputWoman}
					setInputFields={setInputWoman}
					select={selectItem}
					data={data}
					title={'Bride'}
					setClick={setClick1}
				></FormModalProfile>
			) : (
				<></>
			)}
			<div
				className={
					'bg-gray-200 dark:bg-gray-900 flex flex-wrap items-center justify-center max-w-full overflow-auto'
				}
			>
				<CardUserProfile title={'Groom'} setClick={setClick} click={click} />
				<CardUserProfile title={'Bride'} setClick={setClick1} click={click1} />
			</div>
		</>
	);
}

Profile.layout = ClientLayout;

function FormModalProfile(props) {
	const [city, setCity] = useState([{ id: '', name: '' }]);
	const [file, setFile] = useState(null);
	const [selectedFile, setSelectedFile] = useState(null);
	const handleChangeText = (key, event) => {
		props.setInputFields({ ...props.inputFields, [key]: event.target.value });
	};
	useEffect(() => {
		if (props.inputFields.province_id != null) {
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
						First Name
					</label>
					<InputText
						key={'first_name'}
						keyInput={'first_name'}
						inputFields={props.inputFields.first_name}
						handleChangeText={handleChangeText}
					/>
				</div>
				<div className='w-full md:w-1/2 px-3'>
					<label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
						Last Name
					</label>
					<InputText
						key={'last_name'}
						keyInput={'last_name'}
						inputFields={props.inputFields.last_name}
						handleChangeText={handleChangeText}
					/>
				</div>
			</div>
			{props.select.gender !== undefined ? (
				<Select
					data={props.select.gender}
					setInputFields={props.setInputFields}
					inputFields={props.inputFields}
					title={'gender'}
				/>
			) : (
				<></>
			)}
			<div className='flex flex-wrap -mx-3 py-2'>
				<div className='w-full md:w-1/2 px-3 md:mb-0'>
					<label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
						Nickname
					</label>
					<InputText
						key={'nickname'}
						keyInput={'nickname'}
						inputFields={props.inputFields.nickname}
						handleChangeText={handleChangeText}
					/>
				</div>
				<div className='w-full md:w-1/2 px-3'>
					<label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
						Parents Name
					</label>
					<InputText
						key={'parents_name'}
						keyInput={'parents_name'}
						inputFields={props.inputFields.parents_name}
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
			<div
				id='sosmed'
				className='h-full opacity-100 overflow-hidden transition-all ease-in-out duration-300 mt-2'
			>
				<div className='grid grid-cols-2 gap-4'>
					<div className='col-span-2 sm:col-span-1'>
						<div>
							<label htmlFor='twitter' className='flex justify-between'>
								<span className='block text-sm font-medium text-gray-700'>Twitter</span>{' '}
								<span className='text-sm text-gray-400'>optional</span>
							</label>
							<div className='mt-1 flex rounded-md shadow-sm'>
								<span className='inline-flex items-center px-2 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm'>
									<i className='fa-brands fa-twitter' />
								</span>
								<input
									id='twitter'
									type='text'
									name='twitter'
									placeholder='tulis tanpa @'
									autoComplete=''
									className='appearance-none block w-full p-3 border rounded-md rounded-l-none shadow-sm
                                placeholder-gray-400 focus:outline-none focus:ring-pinky-500 focus:border-pinky-500 text-sm  bg-white  border-gray-300 dark:border-gray-warm'
								/>
							</div>
						</div>
					</div>
					<div className='col-span-2 sm:col-span-1'>
						<div>
							<label htmlFor='linkedin' className='flex justify-between'>
								<span className='block text-sm font-medium text-gray-700'>
									LinkedIn
								</span>{' '}
								<span className='text-sm text-gray-400'>optional</span>
							</label>
							<div className='mt-1 flex rounded-md shadow-sm'>
								<span className='inline-flex items-center px-2 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm'>
									<i className='fa-brands fa-linkedin' />
								</span>
								<input
									id='linkedin'
									type='text'
									name='linkedin'
									placeholder='tulis tanpa @'
									autoComplete=''
									className='appearance-none block w-full p-3 border rounded-md rounded-l-none shadow-sm
                                placeholder-gray-400 focus:outline-none focus:ring-pinky-500 focus:border-pinky-500 text-sm  bg-white  border-gray-300 dark:border-gray-warm'
								/>
							</div>
						</div>
					</div>
					<div className='col-span-2 sm:col-span-1'>
						<div>
							<label htmlFor='instagram' className='flex justify-between'>
								<span className='block text-sm font-medium text-gray-700'>
									instagram
								</span>{' '}
								<span className='text-sm text-gray-400'>optional</span>
							</label>
							<div className='mt-1 flex rounded-md shadow-sm'>
								<span className='inline-flex items-center px-2 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm'>
									<i className='fa-brands fa-instagram' />
								</span>
								<input
									id='instagram'
									type='text'
									name='instagram'
									placeholder='tulis tanpa @'
									autoComplete=''
									className='appearance-none block w-full p-3 border rounded-md rounded-l-none shadow-sm
                                placeholder-gray-400 focus:outline-none focus:ring-pinky-500 focus:border-pinky-500 text-sm  bg-white  border-gray-300 dark:border-gray-warm'
								/>
							</div>
						</div>
					</div>
					<div className='col-span-2 sm:col-span-1'>
						<div>
							<label htmlFor='facebook' className='flex justify-between'>
								<span className='block text-sm font-medium text-gray-700'>
									Facebook
								</span>{' '}
								<span className='text-sm text-gray-400'>optional</span>
							</label>
							<div className='mt-1 flex rounded-md shadow-sm'>
								<span className='inline-flex items-center px-2 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm'>
									<i className='fa-brands fa-facebook' />
								</span>
								<input
									id='facebook'
									type='text'
									name='facebook'
									placeholder='tulis tanpa @'
									autoComplete=''
									className='appearance-none block w-full p-3 border rounded-md rounded-l-none shadow-sm
                                placeholder-gray-400 focus:outline-none focus:ring-pinky-500 focus:border-pinky-500 text-sm  bg-white  border-gray-300 dark:border-gray-warm'
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
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
