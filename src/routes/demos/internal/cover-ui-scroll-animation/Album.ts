export type Album = {
	id: string;
	name: string;
	image: string;
	type?: string;
};

export const albums: Album[] = [
	{
		id: '2f6fuHQTQ4SRzbjhEuJZkl',
		name: 'WIIPOP',
		image: 'https://i.scdn.co/image/ab67616d00001e028eca19f50f231d0113270c35'
	},
	{
		id: '151mT9g0fDHVfpmWeYk4Wx',
		name: 'dots-and-loops',
		image: 'https://i.scdn.co/image/ab67616d00001e025e70712e0193f7a9bbc23c0d'
	},
	{
		id: '0bWLoTogeRGPwAHzVFBPm6',
		name: 'Hazardous Bubble Basics',
		image: 'https://i.scdn.co/image/ab67616d00001e02a8bd32b5e1f3aa802bfcbc22'
	},
	{
		id: '7IUUaatsZEC81o9uWHJ1Nv',
		name: 'Amygdala',
		image: 'https://i.scdn.co/image/ab67616d00001e02c594b449199f0ebb7738345d'
	},
	{
		id: '4Cdvtu5XUmCKPwcnue11xS',
		name: 'Memorial Album',
		image: 'https://i.scdn.co/image/ab67616d00001e02058ec9749ace1aa96ab57829'
	},
	{
		id: '04qyn8by7O5bDLhlhmiqgC',
		name: '4ngelNumb3rzzz - Tropical Gatekeeping Remix',
		image: 'https://i.scdn.co/image/ab67616d00001e0296b19b1cf9ca36d5f5ad8d3e',
		type: 'track'
	},
	{
		id: '0eH17iG3LJY88hjCTdC756?si=ca0c6b631bbd4e23',
		name: 'Boing Beat',
		image: 'https://i.scdn.co/image/ab67616d00001e02ce4b5eae6d35e152b853fa1b',
		type: 'track'
	}
];

export const getAlbumURL = (album: Album) =>
	`https://open.spotify.com/${album.type ?? 'album'}/${album.id}`;
export const getAlbumEmbedURL = (album: Album) =>
	`https://open.spotify.com/embed/${album.type ?? 'album'}/${album.id}`;
