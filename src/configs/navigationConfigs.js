const navigationConfig = [
    {
        id: "Main",
        title: "MAIN",
        type: "group",
        children: [
            {
                id: "dashboard",
                title: "Dashboard",
                type: "item",
                icon: "apps",
                url: "/",
                exact: true,
            }
        ],
    },
    {
        id: "Pages",
        title: "Pages",
        type: "group",
        children: [
            {
                id: "Authentication",
                title: "Authentication",
                type: "collapse",
                icon: "lock",
                children: [
                    {
                        id: "Login",
                        title: "Login",
                        type: "item",
                        url: "/pages/auth/login",
                        exact: true,
                    },
                    {
                        id: "Register",
                        title: "Register",
                        type: "item",
                        url: "/pages/auth/register",
                        exact: true,
                    },
                    {
                        id: "Forgot Password",
                        title: "Forgot Password",
                        type: "item",
                        url: "/pages/auth/forgot-password",
                        exact: true,
                    },
                ],
            }
        ],
    },
    {
        id: "divider-1",
        type: "divider",
    }
];

export default navigationConfig;
