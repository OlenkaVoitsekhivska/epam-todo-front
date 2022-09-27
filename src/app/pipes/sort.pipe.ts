import { Pipe, PipeTransform } from '@angular/core';
import { BoardI } from '../models/board.model';



enum OrderE {
  ASC = "ASC",
  DESC = "DESC"
}



@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {

  

  // transform(boards: BoardI[], sort: OrderE): BoardI[] {
   
  //     if(sort===OrderE.ASC){
  //       return boards.sort((a,b)=>a.name.localeCompare(b.name))
  //     }else if(sort===OrderE.DESC){
  //       return boards.sort((a,b)=>b.name.localeCompare(a.name))
  //     }else{
  //       return boards;
  //     }
  //   }

  transform(boards: BoardI[], sort: OrderE): BoardI[] {
    if(sort){
      const [order, parameter] = sort.split(' ')
      if(order===OrderE.ASC){
      switch(parameter){
        case 'name':
          return boards.sort((a,b)=>a.name.localeCompare(b.name));
          case 'date':
            return boards.sort((a,b)=>a.createdAt.getTime()-b.createdAt.getTime());
         default:
           return boards.sort()
      }
      }else if(order===OrderE.DESC){
        switch(parameter){
          case 'name':
            return boards.sort((a,b)=>b.name.localeCompare(a.name));
            case 'date':
              return boards.sort((a,b)=>b.createdAt.getTime()-a.createdAt.getTime());
            default:
              return boards.sort()
        }
      
      }
        }
        else{
          return boards;
        }
    }
  
}


