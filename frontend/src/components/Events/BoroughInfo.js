import { useSelector } from "react-redux";

export default function BoroughInfo() {
    const openStreets = useSelector(state => state?.openStreet)
    let defaultBoroughState = {
        "Brooklyn": 0,
        "Bronx": 0,
        "Manhattan": 0,
        "Queens": 0,
        "Staten Island": 0
    }

    if (openStreets) {
        openStreets.forEach(openStreet => { // Fill up boroughState with a sort of counter
            const currentBorough = openStreet.location.borough
            defaultBoroughState[currentBorough] += 1
        })
    }

    function displayBoroughs(boroughObj) {
        let displayArray = [] // making an array of jsx elements with boro info
        for(const boroughName in boroughObj) {
            displayArray.push(
            <div className="single-borough">
                <p className="borough-info-name">{boroughName}</p>
                <p>{boroughObj[boroughName]}</p>
            </div>)
        }
        return (<>{displayArray}</>)
    }

    return (
        <div className="borough-info">
            {displayBoroughs(defaultBoroughState)}
        </div>
    )
}