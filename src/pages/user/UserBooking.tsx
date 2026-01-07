import React, { useState } from 'react'

function UserBooking() {
    const [loading, setLoading] = useState<boolean>(false);
  return (
    <div className='userBooking'>

                <div className="user-profile-table">
                <h1>Order List</h1>
                <table>
                <tr className='table-header'>
                    <th>order Id</th>
                    <th>no of items</th>
                    <th>amount</th>
                    <th>date</th>
                    <th>status</th>
                    <th>tracking</th>
                </tr>
                <tr>
                    <td>#cmd7hsh2</td>
                    <td>1</td>
                    <td>₦2222</td>
                    <td>feb 2 2022</td>
                    <td>
                        <div className="inprogress">in progress</div> 
                    </td>
                    <td> <div className="track">tracking details</div> </td>
                </tr>
                <tr>
                    <td>#cmd7hsh2</td>
                    <td>1</td>
                    <td>₦2222</td>
                    <td>feb 2 2022</td>
                    <td>
                        <div className="completed">complete</div> 
                    </td>
                    <td> <div className="track">tracking details</div> </td>
                </tr>
                <tr>
                    <td>#cmd7hsh2</td>
                    <td>1</td>
                    <td>₦2222</td>
                    <td>feb 2 2022</td>
                    <td>
                        <div className="approved">approved</div> 
                    </td>
                    <td> <div className="track">tracking details</div> </td>
                </tr>
                <tr>
                    <td>#cmd7hsh2</td>
                    <td>1</td>
                    <td>₦2222</td>
                    <td>feb 2 2022</td>
                    <td>
                        <div className="rejected">reject</div> 
                    </td>
                    <td> <div className="track">tracking details</div> </td>
                </tr>
                <tr>
                    <td>#cmd7hsh2</td>
                    <td>1</td>
                    <td>₦2222</td>
                    <td>feb 2 2022</td>
                    <td>
                        <div className="pendings">pending</div> 
                    </td>
                    <td>
                        <div className="track">tracking details</div> 
                    </td>
                </tr>
                </table>
                </div> 
    </div>
  )
}

export default UserBooking