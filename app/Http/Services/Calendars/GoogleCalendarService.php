<?php

namespace App\Services\Calendars;

use Google\Client;
use Google\Service\Calendar;

class GoogleCalendarService
{
    private $client;

    public function __construct()
    {
        $this->client = new Client();
        $this->client->setClientId(config('services.google.client_id'));
        $this->client->setClientSecret(config('services.google.client_secret'));
        $this->client->setRedirectUri(config('services.google.redirect'));
        $this->client->addScope(Calendar::CALENDAR);
        $this->client->setAccessType('offline');
        $this->client->setPrompt('consent');
    }

    public function getAuthUrl()
    {
        return $this->client->createAuthUrl();
    }

    public function authenticate($code)
    {
        return $this->client->fetchAccessTokenWithAuthCode($code);
    }

    public function setAccessToken($token)
    {
        $this->client->setAccessToken($token);
    }

    public function createEvent($summary, $startDateTime, $endDateTime, $attendeesEmails = [])
    {
        $service = new Calendar($this->client);

        $event = new Calendar\Event([
            'summary' => $summary,
            'start' => ['dateTime' => $startDateTime, 'timeZone' => 'Asia/Kolkata'],
            'end' => ['dateTime' => $endDateTime, 'timeZone' => 'Asia/Kolkata'],
            'attendees' => array_map(fn($email) => ['email' => $email], $attendeesEmails)
        ]);

        return $service->events->insert('primary', $event);
    }
}