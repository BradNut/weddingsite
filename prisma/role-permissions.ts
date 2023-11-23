enum Permission {
	UPDATE_USER = "UPDATE_USER",
	VIEW_USER = "VIEW_USER",
}

export const RolePermissions = {
	admin: {
		permission: [Permission.UPDATE_USER, Permission.VIEW_USER],
	},
	guest: {
		permission: [Permission.VIEW_USER],
	}
}