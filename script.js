let API = "https://www.anapioficeandfire.com/api/books";

let body = document.querySelector('body');

let containerfluid = document.createElement('div')
  containerfluid.classList.add('container-fluid');
  body.append(containerfluid);

let container = document.createElement('div')
  containerfluid.append(container);
  container.classList.add('container');

let search = document.createElement('div')
    search.classList.add('search')

    let h1 = document.createElement('h1')
    h1.innerText = 'All Books'
    search.append(h1);
    
    let input = document.createElement('input')
    input.setAttribute('type','text')
    input.setAttribute('name'," ")
    input.setAttribute('id',"find")
    input.setAttribute('placeholder',"Search Here...")
    input.setAttribute('onkeyup','searching()')
    search.append(input)
    container.append(search);

let bookList = document.createElement('div');
  bookList.classList.add('bookList');
  container.append(bookList);

async function data(){
    try{
    let b = await fetch(API)
    let books = await b.json(0)
    console.log(books);

    for(let i of books ) {
        try{
            let obj = { "Book Name": i.name, "ISBN": i.isbn, "Pages":i.numberOfPages, "Authors": i.authors[0], "Publisher": i.publisher,
             "Release Date":i.released, "Characters":i.characters}
           let book = document.createElement('div')
           book.classList.add('book')
           for(let j of Object.keys(obj)) 
           {
             if(j == "Book Name") {
                let h3 = document.createElement('h3')
                h3.innerHTML = `${j} : ${obj[j]}`;
                book.append(h3);
                continue
             }

             if(j == "Characters")
                {
                    for(let k=1; k<=5; k++) {
                        if(k == 5){}
                        let a = document.createElement('a')
                        a.setAttribute('href',obj[j][k]);
                        a.setAttribute('target','_blank');
                        if(k == 5){
                            a.innerHTML = `Character${k}`;
                        } else {
                            a.innerHTML = `Character${k} ,`;
                        }
                        book.append(a);
                    }
                    continue
                }
                let p = document.createElement('p')
                p.innerHTML = `${j} : ${obj[j]}`;
                book.append(p);
            }
              console.log("*".repeat(50));
              bookList.append(book);
            }
            catch(err){
            console.log(err);
            console.log('this is an forloop error')
            }
       }
    }catch(err) {
        console.log(err);
    }
    console.log(containerfluid);
}
data()

function searching() {
    let filter = document.getElementById('find').value.toUpperCase();
    console.log('id',filter);
    let item = document.querySelectorAll('.book')
    console.log('book',item);
    let f = document.getElementsByTagName('h3');
    console.log('length h3',f);
    for(var i=0; i<=f.length; i++)
    {
        let a = item[i].getElementsByTagName('h3')[0];
        let value = a.innerHTML || a.innerText || a.textContent;
        if(value.toUpperCase().indexOf(filter) > -1) {
             item[i].style.display="block";
        }
        else {
            item[i].style.display="none";
        }
    }
    }

