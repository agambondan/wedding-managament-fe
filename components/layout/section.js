export const Content = (props) => {
	return (
		<section className='w-full h-screen overflow-x-hidden border-t flex flex-col'>
			<article className='w-full flex-grow p-6'>{props.children}</article>
		</section>
	);
};
