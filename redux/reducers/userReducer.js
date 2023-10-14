import { COLORS } from "../../constants/theme";
import { timetable } from "../../utils/timetable";

let defaultState = {
    timetable: timetable,
    timetableUpdate:false,
    user: {},
    programs: [],
    units: [],
    networks: [],
    discord: [],
    feedback: [],
    location: {},
    eventAttendance: {},
    theme:{color:COLORS.rose,name:"Rose"},
    model:{color:COLORS.rose,name:"Bella"},
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
            case 'FEEDBACK':
                return {
                    ...state,
                   feedback: payload,
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
        case 'MY_TIMETABLE_UPD':
            return {
                ...state,
                timetableUpdate: payload    
            }
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