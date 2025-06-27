export const host = process.env.REACT_APP_API_BASE_URL;
export const RegisterRoute = `${host}/api/auth/register`;
export const LoginRoute = `${host}/api/auth/login`;
export const setAvatarRoute = `${host}/api/auth/setAvatar`;
export const allUsersRoute = `${host}/api/auth/allUsers`;
export const sendMessageRoute = `${host}/api/messages/addmsg`;
export const getAllMessagesRoute = `${host}/api/messages/getmsg`;
export const LoadChatRoute = `${host}/api/chat/history`