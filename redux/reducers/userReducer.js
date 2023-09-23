import { COLORS } from "../../constants/theme";
import { timetable } from "../../utils/timetable";

let defaultState = {
    timetable: timetable,
<<<<<<< HEAD
    timetableUpdate:false,
    user: {},
    programs: [],
    units: [],
    networks: [],
    discord: [],
    location: {},
    eventAttendance: {},
    theme:{color:COLORS.rose,name:"Rose"},
    model:{color:COLORS.rose,name:"Bella"},
=======
    user: {},
    location: {},
    theme:{color:COLORS.primary,name:"Atlantic"},
    model:{color:COLORS.rose,name:"Susan"},
>>>>>>> 609b2e1e1d7abf10666e93cdddd011cef40cd2f4
    premium:{isPremium:false,plan:"Start"},
    tokens:{total:3000,pending:0,ai:3000,withdrawableTokens:3000,withdrawableAmount:0.03},
  };


const UserReducer = (state = defaultState, action) => {
    
 
    const { type, payload } = action;

    switch(type){
        case 'ON_UPDATE_LOCATION':
            return {
                ...state,
                location: payload,
            }
<<<<<<< HEAD
            case 'PROGRAMS':
                return {
                    ...state,
                    programs: payload,
                }
            case 'UNITS':
                return {
                    ...state,
                    units: payload,
                }
            case 'NETWORKS':
                return {
                    ...state,
                    networks: payload,
                }
            case 'DISCORD':
                return {
                    ...state,
                    discord: payload,
                }
    
    
        case 'E_ATTENDANCE':
            return {
                ...state,
                eventAttendance: payload    
            }
=======
    
>>>>>>> 609b2e1e1d7abf10666e93cdddd011cef40cd2f4
        case 'ON_USER':
            return {
                ...state,
                user: payload    
            }
    
        case 'MY_TIMETABLE':
            return {
                ...state,
                timetable: payload    
            }
<<<<<<< HEAD
        case 'MY_TIMETABLE_UPD':
            return {
                ...state,
                timetableUpdate: payload    
            }
=======
>>>>>>> 609b2e1e1d7abf10666e93cdddd011cef40cd2f4
        case 'MY_THEME':
            return {
                ...state,
                theme: payload    
            }
        case 'MY_MODEL':
            return {
                ...state,
                model: payload    
            }
        case 'MY_PREMIUM':
            return {
                ...state,
                premium: payload    
            }
        case 'MY_TOKENS':
            return {
                ...state,
                tokens: payload    
            }
              

        default:
            return state;

    }


}


export default UserReducer