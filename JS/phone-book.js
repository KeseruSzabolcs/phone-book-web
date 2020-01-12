var persons = [];
var editId;

window.PhoneBook= {

    API_URL: "http://localhost:8085/phone_book_mains",

    //TODO fix errors

    getContacts: function () {
        $.ajax({
            url: PhoneBook.API_URL,
            method: "GET"
        }).done(function(response){
            console.log("GET done");
            console.log(response);

            PhoneBook.displayContacts(JSON.parse(response))
        });
    },

    createContact: function(){
        let lastName = $("#lastNameField").val();
        let firstName = $("#firstNameField").val();
        let phoneNumber = $("#phoneNumberField").val();

        var requestBody = {
            lastName: lastName,
            firstName: firstName,
            phoneNumber: phoneNumber
        };

        $.ajax({
            url: PhoneBook.API_URL,
            method: "POST",
            //MIME type
            contentType: "application/json",
            data: JSON.stringify(requestBody)
        }).done(function () {
            PhoneBook.getContacts();
        })
    },

    updateContact: function(id, firstName, lastName, phoneNumber){
        let requestBody = {
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber
        };

        $.ajax({
            url: PhoneBook.API_URL + "?id=" + id,
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify(requestBody)
        }).done(function () {
            PhoneBook.getContacts();
        })
    },

    startEdit: function (id) {
        var editPerson = persons.find(function (person) {
            console.log(person.firstName);
            return person.id == id;
        });
        console.debug('startEdit', editPerson);

        $('input[name=firstNameField]').val(editPerson.firstName);
        $('input[name=lastNameField]').val(editPerson.lastName);
        $('input[name=phoneNumberField]').val(editPerson.phoneNumber);
        editId = id;
    },

    deleteContact: function(id){

        $.ajax({
            url: PhoneBook.API_URL + "?id=" + id,
            method: "DELETE",
        }).done(function () {
            PhoneBook.getContacts();
        })
    },

    displayContacts: function (items) {
        var tableContent = "";

        items.forEach(item => tableContent += PhoneBook.getItemTableRow(item));

        $("#Contacts tbody").html(tableContent);

    },

    getItemTableRow: function (item) {

        return `<tr>
                <td>${item.firstName}</td>
                <td>${item.lastName}</td>
                <td>${item.phoneNumber}</td>
               <!-- <td>Blank</td> -->
                <td>
                    <center>
                        <a href="#" class="delete-item" data-id="${item.id}"><i class="far fa-trash-alt"></i></a>
                                        
                        <a href="#" class="edit-item" data-id="${item.id}"><i class="fas fa-user-edit"></i></a>
                    </center>             
                 </td>
            </tr>`
    },

    bindEvents: function () {
        $("#create-item-form").submit(function (event) {
            event.preventDefault();

            const person = {
                firstName: $('input[name=firstNameField]').val(),
                lastName: $('input[name=lastNameField]').val(),
                phoneNumber: $('input[name=phoneNumberField]').val()
            };

            if (editId) {
                person.id = editId;
                PhoneBook.updateContact(person.id, person.firstName, person.lastName, person.phoneNumber);
            } else {
                PhoneBook.createContact();
            }
            /*            PhoneBook.createContact();
            *  */
        });

        $("#Contacts").delegate(".edit-item", "click", function () {
            event.preventDefault();
            let id = $(this).data("id");
            PhoneBook.startEdit(id);
        });

        $("#Contacts").delegate(".delete-item", "click", function (event) {
            event.preventDefault();
            let id = $(this).data("id");
            PhoneBook.deleteContact(id);
        })
    }
};
PhoneBook.getContacts();
PhoneBook.bindEvents();