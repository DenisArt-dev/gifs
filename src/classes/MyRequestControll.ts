export default class MyRequestControll {

    private static apiKey = 'HJ9Mai9fYn0miZnux7iAsb4EUdbSsJ0i';
    private static gifUrl = 'https://api.giphy.com/v1/gifs/trending';
    private static gifUrlSearch = 'https://api.giphy.com/v1/gifs/search';
    private static gifUrlId = 'https://api.giphy.com/v1/gifs';
    private static fetchOpt = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
    };

    public static getGifs (limit: number, offset: number): Promise<any>
    {

        let url = MyRequestControll.gifUrl + 
            `?api_key=${MyRequestControll.apiKey}` +
            `&limit=${limit}&offset=${offset}`;

        return fetch(url, MyRequestControll.fetchOpt);
    }

    public static searchGifs (q: string, limit: number = 20, offset: number = 0): Promise<any>
    {
        let url = MyRequestControll.gifUrlSearch + 
            `?api_key=${MyRequestControll.apiKey}` +
            `&q=${q}&limit=${limit}` + 
            `&offset=${offset}`;

        return fetch(url, MyRequestControll.fetchOpt);
    }

    public static getGifsId (id: string): Promise<any>
    {
        let query = `?api_key=${MyRequestControll.apiKey}`;
        return fetch(MyRequestControll.gifUrlId + `/${id}` + query, MyRequestControll.fetchOpt);
    }

}