import {createContext, useContext} from "react";
import {QuickminApi} from "./quickmin-api.js"

let QuickminApiContext=createContext();

export function QuickminApiProvider({fetch, url, apiKey, headers, children}) {
	let api=new QuickminApi({fetch, url, apiKey, headers});

	return (<>
		<QuickminApiContext.Provider value={api}>
			{children}
		</QuickminApiContext.Provider>
	</>);
}

export function useQuickminApi() {
	return useContext(QuickminApiContext);
}
