import { useRouter } from 'next/router';
import React from 'react';
import { Spinner1 } from '../components/layout/spinner';

export function checkRouterPathname(router, matcher) {
	const regex = router.pathname.match(matcher);
	if (regex !== null) {
		return regex[0];
	} else {
		return '';
	}
}

export function isRoutePathname(router, matcher) {
	let isRoute;
	let pathnameSplit = router.pathname.split('/');
	let matcherSplit = matcher.split('/');
	pathnameSplit.map((pathname, index) => {
		if (pathnameSplit.length === matcherSplit.length) {
			if (pathname === matcherSplit[index]) {
				isRoute = true;
			} else {
				isRoute = false;
			}
		}
	});
	return isRoute;
}

export function WaitForRouter({ children, page = false, hidden = false }) {
	const router = useRouter();
	const [ready, setReady] = React.useState(false);

	React.useEffect(() => {
		setReady(true);
	}, []);

	// `ready` check is necessary for empty query cases where
	// !router.isReady on BE and
	// router.isReady immediately on FE
	if (ready && router.isReady) return <>{children}</>;

	// `hidden` and `page` are flags to control <Loader/>, you can ignore them
	if (!hidden) {
		return <Spinner1 />;
	}

	return <></>;
}
