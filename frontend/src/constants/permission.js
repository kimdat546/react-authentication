// MODULES
export const modules = {
	page: 'Dashboard',
};

const pageModule = {
	label: 'Dashboard',
	value: modules.page,
};

// PERMISSIONS
export const permissions = {
	read: 'Read',
	write: 'Write',
};

const readPermission = {
	label: 'Read',
	value: permissions.read,
};
const writePermission = {
	label: 'Write',
	value: permissions.write,
};

export const modulePermissions = [
	{
		...pageModule,
		options: [readPermission, writePermission],
	},
];

export const modulesText = {
	[pageModule.value]: [pageModule.label],
};

export const permissionsText = {
	[readPermission.value]: [readPermission.label],
	[writePermission.value]: [writePermission.label],
};
