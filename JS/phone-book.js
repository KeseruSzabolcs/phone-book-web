window.PhoneBook= {

    API_URL: "http://localhost:8085/phone_book_mains",

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
                <td>"Emil@yahoo.com"</td>
                <td><a href="#" class="delete-item" data-id="${item.id}">
                        <i class="far fa-trash-alt"></i>
                    </a> </td>
            </tr>`
    }
};
PhoneBook.getContacts();