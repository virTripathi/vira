<?php

namespace App\Http\Services\Main;

use Illuminate\Support\Facades\Auth;
use App\Models\Chatbot\Chat as ChatbotChat;

class SidebarService
{
    public function get()
    {
        $user = Auth::user();
        if ($user->roles->contains('title', 'General User')) {
            $chats = ChatbotChat::where('user_id', $user->id)
                ->orderBy('created_at', 'desc')
                ->get(['id', 'title']);

            return response()->json(
                $chats->map(fn($chat) => [
                    'label' => $chat->title,
                    // 'route' => "chats.show/{$chat->id}",
                ])
            );
        }

        $roleConfigs = [
            'admin' => [
                [
                    'label' => 'Task Management',
                    'icon' => 'PresentationChartBarIcon',
                    'children' => [
                        ['label' => 'Tasks', 'route' => 'tasks.index'],
                    ],
                ],
                [
                    'label' => 'Settings',
                    'icon' => 'Cog6ToothIcon',
                    'children' => [
                        ['label' => 'Profile', 'route' => 'profile.edit'],
                        ['label' => 'Logout', 'route' => 'logout', 'method' => 'post'],
                    ],
                ],
            ],
            'resource' => [
                [
                    'label' => 'Resources',
                    'icon' => 'Cog6ToothIcon',
                    'children' => [
                        ['label' => 'Resource Mgmt', 'route' => 'resources.index'],
                    ],
                ],
            ],
            'superadmin' => [
                [
                    'label' => 'Admin Panel',
                    'icon' => 'PresentationChartBarIcon',
                    'children' => [
                        ['label' => 'Users', 'route' => 'users.index'],
                    ],
                ],
            ],
        ];

        $items = [];
        foreach ($user->roles as $role) {
            if (isset($roleConfigs[$role->title])) {
                $items = array_merge($items, $roleConfigs[$role->title]);
            }
        }

        return response()->json($items);
    }
}