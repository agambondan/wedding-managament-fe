export const formatDate = (string) => {
	let options = {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric',
	};
	return new Date(string).toLocaleDateString([], options);
};

export const formatSubString = (str) => {
	if (str.length >= 480) {
		return str.substring(0, str.length / 3) + ' ....';
	} else {
		return str;
	}
};

export const toPascalCase = (s) => {
	return s.replace(/\w+/g, function (w) {
		return w[0].toUpperCase() + w.slice(1).toLowerCase();
	});
};

export const rupiah = (number) => {
	return new Intl.NumberFormat('id-ID', {
		style: 'currency',
		currency: 'IDR',
	}).format(number);
};

/* Fungsi formatRupiah */
export function formatRupiah(angka, prefix) {
	var number_string = angka.replace(/[^,\d]/g, '').toString(),
		split = number_string.split(','),
		sisa = split[0].length % 3,
		rupiah = split[0].substr(0, sisa),
		ribuan = split[0].substr(sisa).match(/\d{3}/gi);

	if (ribuan) {
		var separator = sisa ? '.' : '';
		rupiah += separator + ribuan.join('.');
	}

	rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;
	return prefix === undefined ? rupiah : rupiah ? 'Rp. ' + rupiah : '';
}
