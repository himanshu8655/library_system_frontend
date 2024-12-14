export class BookModel {
    [key: string]: any;
    price:string=''
    aboutBook:string=''
    author:string=''
    bookName:string = ''
    thumbnailUrl:string | null = null
    fileUrl:string | null = null
    bookId : string | null = null
    selected : boolean | null = false
}
