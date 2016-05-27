/*global $*/
/**
 * @file Example 3 - Custom events and "good enough" encapsulation
 *       The code should be executable in Chrome 49+, Firefox 45+, and Edge 13+ without transpiling.
 * @author Vincent Diep
 */
'use strict';

class AbstractComponent {
    constructor(id) {
        this.domNode = document.getElementById(id);
    }
}

class TicketsTable extends AbstractComponent {
    initialize() {
        //Initialize DataTables
        this.dt = $(this.domNode).DataTable({retrieve: true});
    }
}

class AddTicketForm extends AbstractComponent {
    initialize() {
        // Initialize stuff
        $('.date').datepicker({
            autoclose: true,
            endDate: '0d',
            format: 'yyyy-mm-dd',
            todayBtn: 'linked',
            todayHighlight: true
        });
        
        // Events
        $(this.domNode).submit(e => this.submit(e));
    }
    
    submit(e) {
        e.preventDefault();

        $.ajax({
            method: this.domNode.method,
            url: this.domNode.action,
            data: $(this.domNode).serialize()
        }).done(data => {
            // Trigger custom event
            $(this.domNode).trigger('my-awesome-app:ticket-issued', [data]);
            
            // Reset the form
            this.domNode.reset();
        });
    }
}

let table = new TicketsTable('ticket-history');
table.initialize();

let form = new AddTicketForm('insert-ticket-form');
form.initialize();

// Handle event here
$(form.domNode).on('my-awesome-app:ticket-issued', (event, data) => {
    console.log(event); // Just for demonstration purposes

    /***
     * By moving the logic to an event listener, the form is decoupled from the table.
     * However, the event handler logic is "reaching through" the table object
     * to access the DataTables object inside, violating the Law of Demeter.
     */
    
    // Add row to DataTable
    table.dt.row.add([
        data.offender,
        data.date,
        data.violation
    ]).draw();
});