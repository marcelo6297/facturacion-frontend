/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

export class PageableResponse<T> {
    content: Array<T>;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    size: number;
    sort: any;
    totalElements: number;
    totalPages: number;
}
export interface Page {
    pageSize:number
    pageIndex:number
}
export interface Sort {
    active: string
    direction:string
    
}

export function PageableRequestOptions(page?:Page, sort?:Sort):any {
     let options = {}
    if (page) {
           options = {
               params: {
                   size: page.pageSize,
                   page: page.pageIndex,
               }
           }
       }
       if (typeof sort !== "undefined" && sort.active) {
           options['params']['sort'] = sort.active +','+sort.direction
       }
       return options
    
}