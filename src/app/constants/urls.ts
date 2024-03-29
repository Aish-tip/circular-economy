import { environment } from '../../environments/environment';

export class Urls{
    private static BASE_URL: string = environment.base_url;
    public static readonly ECOUSER = `${Urls.BASE_URL}/ecousers`;
    public static readonly LOGIN = `${Urls.BASE_URL}/accountdetails/login`;
    public static readonly USERS = `${Urls.BASE_URL}/accountdetails`;
    public static readonly PRODUCT = `${Urls.BASE_URL}/products`;
    public static readonly RITEM = `${Urls.BASE_URL}/requestItems`;
    public static readonly ULIST = `${Urls.BASE_URL}/userLists`;
    public static readonly LOGOUT = `${Urls.BASE_URL}/accountdetails/logout`;
    public static readonly CONTAINER = `${Urls.BASE_URL}/containers`;
}
