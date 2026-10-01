export const DEMO_SESSION_COOKIE = "auchan-demo-session";
export const DEMO_SESSION_VALUE = "connected";

export const createDemoSession = (): void => {
	const secure = window.location.protocol === "https:" ? "; Secure" : "";
	document.cookie = `${DEMO_SESSION_COOKIE}=${DEMO_SESSION_VALUE}; Path=/; Max-Age=28800; SameSite=Lax${secure}`;
};