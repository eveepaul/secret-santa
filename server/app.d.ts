declare namespace Lucia {
    type Auth = import("./utils/lucia").Auth;
    type DatabaseUserAttributes = {
        name: string;
        picture: string
    };
    type DatabaseSessionAttributes = {};
}