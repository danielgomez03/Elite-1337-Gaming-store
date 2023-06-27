const products = [
	{
		productId: '263f0f02-99f4-4811-b886-f2c36c2cfc26',
		name: 'AMD Ryzen 9 5900X',
		description: '12-Core 24-Thread Unlocked Desktop Processor',
		manufacturer: 'AMD',
		origin: 'USA',
		price: '549.99',
		discount: '10.0',
		stock: 50,
		createdAt: '2023-06-26T10:14:23.582Z',
		isActive: true,
		categoryId: 2,
		images: [
			{
				imageId: 'a7882b4c-5a50-431b-a621-d4a56561b0c7',
				url: 'https://asset.cloudinary.com/dwavcdgpu/bb438b548ad93614d2e5122e9908ba35',
				caption: 'AMD Ryzen 9 5900X'
			}
		],
		category: {
			categoryId: 2,
			name: 'CPUs/Processors',
			parent: {
				categoryId: 1,
				name: 'Hardware',
				parent: null
			}
		}
	},
	{
		productId: '7d23e873-6bb8-4569-acf5-ebeef606afd6',
		name: 'ASUS ROG Strix X570-E Gaming',
		description: 'ATX Gaming Motherboard',
		manufacturer: 'ASUS',
		origin: 'Taiwan',
		price: '349.99',
		discount: '5.0',
		stock: 30,
		createdAt: '2023-06-26T10:16:19.012Z',
		isActive: true,
		categoryId: 3,
		images: [
			{
				imageId: '96828731-f3be-40be-b5eb-ac95a469975d',
				url: 'https://asset.cloudinary.com/dwavcdgpu/58d5c7042c9256391f282c9f587be43e',
				caption: 'ASUS ROG Strix X570-E Gaming'
			}
		],
		category: {
			categoryId: 3,
			name: 'Motherboards',
			parent: {
				categoryId: 1,
				name: 'Hardware',
				parent: null
			}
		}
	},
	{
		productId: '1c7047e0-6978-4e3b-811d-59dccb5e7637',
		name: 'ASUS TUF Gaming VG27AQL1A',
		description: '27-inch WQHD IPS Gaming Monitor',
		manufacturer: 'ASUS',
		origin: 'Taiwan',
		price: '599.99',
		discount: '0.0',
		stock: 10,
		createdAt: '2023-06-26T10:17:44.320Z',
		isActive: true,
		categoryId: 23,
		images: [
			{
				imageId: '845e6b22-f341-4ad5-849d-774e73a48cb4',
				url: 'https://asset.cloudinary.com/dwavcdgpu/dac7e668edeb09979c7d56df40ee6cb9',
				caption: 'ASUS TUF Gaming VG27AQL1A'
			}
		],
		category: {
			categoryId: 23,
			name: 'Standard Monitors',
			parent: {
				categoryId: 22,
				name: 'Monitors',
				parent: null
			}
		}
	},
	{
		productId: 'c21f20e7-a050-4ce3-81ef-48ce70593f4d',
		name: 'Corsair Vengeance RGB Pro',
		description: '16GB (2 x 8GB) DDR4 RAM',
		manufacturer: 'Corsair',
		origin: 'USA',
		price: '149.99',
		discount: '0.0',
		stock: 60,
		createdAt: '2023-06-26T10:17:20.743Z',
		isActive: true,
		categoryId: 17,
		images: [
			{
				imageId: '22951553-47de-4fc6-969e-cc54a33c02e0',
				url: 'https://asset.cloudinary.com/dwavcdgpu/f1c5a0dd717c5e429816bc9f8062deb4',
				caption: 'Corsair Vengeance RGB Pro'
			}
		],
		category: {
			categoryId: 17,
			name: 'DIMM (DDR3, DDR4)',
			parent: {
				categoryId: 16,
				name: 'RAM Memory',
				parent: {
					categoryId: 1,
					name: 'Hardware'
				}
			}
		}
	},
	{
		productId: 'dd758a5a-e26a-4639-906c-f4bc3404180d',
		name: 'EVGA SuperNOVA 850 P2',
		description: '80+ Platinum Fully Modular Power Supply',
		manufacturer: 'EVGA',
		origin: 'USA',
		price: '189.99',
		discount: '0.0',
		stock: 15,
		createdAt: '2023-06-26T10:17:40.611Z',
		isActive: true,
		categoryId: 21,
		images: [
			{
				imageId: '968d3468-8a19-44b1-b957-87d08f4d16c8',
				url: 'https://asset.cloudinary.com/dwavcdgpu/3e893b55e42d90ac3701ca759756dc23',
				caption: 'EVGA SuperNOVA 850 P2'
			}
		],
		category: {
			categoryId: 21,
			name: 'Power Supplies',
			parent: {
				categoryId: 19,
				name: 'Cases and Power Supplies',
				parent: {
					categoryId: 1,
					name: 'Hardware'
				}
			}
		}
	},
	{
		productId: 'c3252677-6ad4-4512-8dbd-f6a5b19b6afe',
		name: 'GIGABYTE GeForce RTX 3080',
		description: 'Gaming OC Graphics Card',
		manufacturer: 'GIGABYTE',
		origin: 'Taiwan',
		price: '1099.99',
		discount: '15.0',
		stock: 15,
		createdAt: '2023-06-26T10:16:36.563Z',
		isActive: true,
		categoryId: 4,
		images: [
			{
				imageId: '198bfc5b-d000-4833-9425-2d6d2105c7fd',
				url: 'https://asset.cloudinary.com/dwavcdgpu/1c353b165f2dd4e667fb9a5cfdd70c6d',
				caption: 'GIGABYTE GeForce RTX 3080'
			}
		],
		category: {
			categoryId: 4,
			name: 'Graphics/Video Cards',
			parent: {
				categoryId: 1,
				name: 'Hardware',
				parent: null
			}
		}
	},
	{
		productId: 'e1090813-440f-4035-9367-8e84844f78a8',
		name: 'Intel Core i9-10900K',
		description: '10-Core 20-Thread Unlocked Desktop Processor',
		manufacturer: 'Intel',
		origin: 'USA',
		price: '499.99',
		discount: '0.0',
		stock: 20,
		createdAt: '2023-06-26T10:15:57.930Z',
		isActive: true,
		categoryId: 2,
		images: [
			{
				imageId: '8d4bee20-4c47-4a9a-bfd7-4cfaf8eb8643',
				url: 'https://asset.cloudinary.com/dwavcdgpu/b51f92e1f689efd0f55c9d2fc400dcd3',
				caption: 'Intel Core i9-10900K'
			}
		],
		category: {
			categoryId: 2,
			name: 'CPUs/Processors',
			parent: {
				categoryId: 1,
				name: 'Hardware',
				parent: null
			}
		}
	},
	{
		productId: '760b8430-962f-45c2-9cc6-ba3512dbde6e',
		name: 'Logitech G Pro X',
		description: 'Wired Gaming Headset with Blue VO!CE Mic Technology',
		manufacturer: 'Logitech',
		origin: 'Switzerland',
		price: '129.99',
		discount: '0.0',
		stock: 30,
		createdAt: '2023-06-26T10:15:34.287Z',
		isActive: true,
		categoryId: 26,
		images: [
			{
				imageId: '328726bc-03f5-478a-bd00-6b35d3e47b54',
				url: 'https://asset.cloudinary.com/dwavcdgpu/e9054be9aa35ab2c9c189782ddf8a49c',
				caption: 'Logitech G Pro X'
			}
		],
		category: {
			categoryId: 26,
			name: 'Headphones',
			parent: {
				categoryId: 25,
				name: 'Peripherals and Accessories',
				parent: null
			}
		}
	},
	{
		productId: '09e361ca-e3d4-4ff8-b335-7803f17ac69d',
		name: 'NZXT H510',
		description: 'Mid-Tower PC Gaming Case',
		manufacturer: 'NZXT',
		origin: 'Taiwan',
		price: '79.99',
		discount: '10.0',
		stock: 25,
		createdAt: '2023-06-26T10:17:32.636Z',
		isActive: true,
		categoryId: 20,
		images: [
			{
				imageId: '5f2801b0-12dd-4422-aba1-835c6b950cf4',
				url: 'https://asset.cloudinary.com/dwavcdgpu/c248c0f0b61f54c5c3ad275c7eb215ed',
				caption: 'NZXT H510'
			}
		],
		category: {
			categoryId: 20,
			name: 'Cases',
			parent: {
				categoryId: 19,
				name: 'Cases and Power Supplies',
				parent: {
					categoryId: 1,
					name: 'Hardware'
				}
			}
		}
	},
	{
		productId: 'f0cc13fb-20c0-46b6-86ba-7095c637b193',
		name: 'Razer DeathAdder V2',
		description: 'Wired Gaming Mouse with 20K DPI Optical Sensor',
		manufacturer: 'Razer',
		origin: 'USA',
		price: '69.99',
		discount: '10.0',
		stock: 40,
		createdAt: '2023-06-26T10:15:12.433Z',
		isActive: true,
		categoryId: 29,
		images: [
			{
				imageId: 'ec24f3a3-6fda-42f8-8630-695510d87aeb',
				url: 'https://asset.cloudinary.com/dwavcdgpu/4a9777ac7df2d7a4120bed8144b233d3',
				caption: 'Razer DeathAdder V2'
			}
		],
		category: {
			categoryId: 29,
			name: 'Mouse',
			parent: {
				categoryId: 25,
				name: 'Peripherals and Accessories',
				parent: null
			}
		}
	},
	{
		productId: '5a6285bc-f411-4b89-8b9e-04c1750d2ee2',
		name: 'Samsung 970 EVO Plus',
		description: '500GB NVMe M.2 Internal SSD',
		manufacturer: 'Samsung',
		origin: 'South Korea',
		price: '99.99',
		discount: '0.0',
		stock: 100,
		createdAt: '2023-06-26T10:16:49.743Z',
		isActive: true,
		categoryId: 8,
		images: [
			{
				imageId: '7f899f4b-7e1c-41e7-a2fa-67eb3263773c',
				url: 'https://asset.cloudinary.com/dwavcdgpu/11db5ac2e7de71ed3fb657d9c019c8a8',
				caption: 'Samsung 970 EVO Plus'
			}
		],
		category: {
			categoryId: 8,
			name: 'Solid State Drives',
			parent: {
				categoryId: 5,
				name: 'Storage',
				parent: {
					categoryId: 1,
					name: 'Hardware'
				}
			}
		}
	},
	{
		productId: 'f0794545-1a2a-454e-aec5-1fbb5618319d',
		name: 'Seagate BarraCuda 2TB',
		description: '3.5-Inch Internal Hard Drive',
		manufacturer: 'Seagate',
		origin: 'USA',
		price: '64.99',
		discount: '20.0',
		stock: 80,
		createdAt: '2023-06-26T10:17:07.195Z',
		isActive: true,
		categoryId: 7,
		images: [
			{
				imageId: 'd0aab150-97ce-46d4-b8d0-dc5155e02022',
				url: 'https://asset.cloudinary.com/dwavcdgpu/1cf0b35bfb83dd9d3a54bc72965b4ad9',
				caption: 'Seagate BarraCuda 2TB'
			}
		],
		category: {
			categoryId: 7,
			name: 'Internal Hard Disk Drives',
			parent: {
				categoryId: 5,
				name: 'Storage',
				parent: {
					categoryId: 1,
					name: 'Hardware'
				}
			}
		}
	},
	{
		productId: 'f4467776-b7e9-4da8-babc-2a446c44fac3',
		name: 'SteelSeries QcK',
		description: 'Gaming Mouse Pad',
		manufacturer: 'SteelSeries',
		origin: 'Denmark',
		price: '14.99',
		discount: '0.0',
		stock: 100,
		createdAt: '2023-06-26T10:14:36.248Z',
		isActive: true,
		categoryId: 30,
		images: [
			{
				imageId: '50ac4d6c-db7e-4ebe-80ec-b7d994d0aed0',
				url: 'https://asset.cloudinary.com/dwavcdgpu/c304d1c9723e024afd5f42ed337726ad',
				caption: 'SteelSeries QcK'
			}
		],
		category: {
			categoryId: 30,
			name: 'Mouse Pads',
			parent: {
				categoryId: 25,
				name: 'Peripherals and Accessories',
				parent: null
			}
		}
	}
];

module.exports = products;  