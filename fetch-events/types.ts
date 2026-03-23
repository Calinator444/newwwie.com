import { Event, Group } from "../src/js/events/types";

export type GroupEdge = {
  node: Event;
};

export type GroupResponse = {
  data: {
    groupByUrlname: Group & {
      events: {
        edges: GroupEdge[];
      };
    };
  };
};


export const MEETUP_GQL_QUERY2 = `
query ($groupName: String!, $beforeDate: DateTime) {
    groupByUrlname(urlname: $groupName) {
        name
        urlname
        keyGroupPhoto {
            id
            baseUrl
        }
        events(
            filter: { beforeDateTime: $beforeDate }
            sort: ASC
        ) {
            edges {
                node {
                    description
                    eventUrl
                    dateTime
                    
                    venue {
                        name
                        lat
                        lon
                        address
                        city
                    }
                    title
                    displayPhoto {
                        baseUrl
                        id
                    }
                    rsvps {
                        totalCount
                    }
                    maxTickets
                    duration
                }
            }
        }
    }
}`;

// Sandbox available at https://www.meetup.com/api/playground/#graphQl-playground
export const MEETUP_GQL_QUERY = `
query ($groupName: String!, $endDate: ZonedDateTime) {
  groupByUrlname(
    urlname: $groupName
  ) {
    name
    urlname
    groupPhoto {
      id
      baseUrl
      preview
    }
      // Deprecated - replaced with groupPhoto
    logo {
      id
      baseUrl
      preview
    }
      // Replaced with "events"?
    unifiedEvents(
      filter: {
        endDateRange: $endDate
      }
    ) {
      edges {
        node {
          title
          description
          dateTime
          eventUrl
          // replaced with rsvps
          going
          
          maxTickets
          duration
          // replaced with display photo
          imageUrl
          venue {
            name
            lat
            lng
            address
            city
          }
        }
      }
    }
  }
}`;
