import {createContext, useContext} from "react";
import {QuickminApi} from "./quickmin-api.js"
import {useConstructor, useEventUpdate} from "./react-util.jsx";

let QuickminApiContext=createContext();

export function QuickminApiProvider({fetch, url, apiKey, headers, children}) {
	let api=new QuickminApi({fetch, url, apiKey, headers});

	return (
		<QuickminApiContext.Provider value={api}>
			{children}
		</QuickminApiContext.Provider>
	);
}

export function useQuickminApi() {
	return useContext(QuickminApiContext);
}

class QuickminUserState extends EventTarget {
	constructor(initialUser) {
		super();
		this.currentUser=initialUser;
	}

	logout() {
		window.document.cookie="qmtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		this.currentUser=null;
		this.dispatchEvent(new Event("change"));
	}
}

let QuickminUserContext=createContext();

export function QuickminUserProvider({initialUser, children}) {
	let quickminUserState=useConstructor(()=>new QuickminUserState(initialUser));

	return (
		<QuickminUserContext.Provider value={quickminUserState}>
			{children}
		</QuickminUserContext.Provider>
	);
}

export function useQuickminUser() {
	let quickminUserState=useContext(QuickminUserContext);
	useEventUpdate(quickminUserState,"change");

	return quickminUserState.currentUser;
}

export function useQuickminLogout() {
	let quickminUserState=useContext(QuickminUserContext);

	return (()=>quickminUserState.logout());
}