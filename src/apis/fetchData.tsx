// export const baseUrl = "http://127.0.0.1:8000/api";
// export const imageUrl = "http://127.0.0.1:8000/images/";
export const baseUrl = "https://webadmin.johntopfoods.com/api";
export const imageUrl = "https://webadmin.johntopfoods.com/images/";

interface ProductResponse {
    requestSuccessful: boolean;
    responseMessage: string;
    responseBody: {
      productId: number;
      productName: string;
      productWeight: number;
      productPrice: number;
      productImage: string;
    };
  }

export const productList = async (): Promise<ProductResponse[] | undefined> => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions :  RequestInit = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    try {
        const response = await fetch(`${baseUrl}/products`, requestOptions);
        const responseDetails = await response.json();
        console.log(responseDetails);
        // if (responseDetails[0].requestSuccessful) {
        //     setBookingData(responseDetails);
        //     setLoading(false);
        // } else {
        // }
        return responseDetails;
    } catch (error) {
        // setError(error);
        console.log("err");
        console.log(error);
    } finally {
        // setLoading(false);
    }
}